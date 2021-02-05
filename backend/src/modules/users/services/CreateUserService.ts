import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    ra,
    name,
    email,
    position,
    subjects,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserRaExists = await this.usersRepository.findByRa(ra);

    if (checkUserRaExists) {
      throw new AppError('RA already used.');
    }

    const checkUserEmailExists = await this.usersRepository.findByEmail(email);

    if (checkUserEmailExists) {
      throw new AppError('Email address already used.');
    }

    if (password !== '') {
      const hashedPassword = await this.hashProvider.generateHash(password);

      const user = await this.usersRepository.create({
        ra,
        name,
        email,
        subjects,
        position,
        password: hashedPassword,
      });

      return user;
    }

    const user = await this.usersRepository.create({
      ra,
      name,
      email,
      subjects,
      position,
      password,
    });

    const { token } = await this.userTokensRepository.generate(user.id);

    const createPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'create_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Agenda de Laboratórios FMM] Definição de senha',
      templateData: {
        file: createPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          ra: user.ra,
        },
      },
    });

    return user;
  }
}

export default CreateUserService;
