import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
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
}

export default CreateUserService;
