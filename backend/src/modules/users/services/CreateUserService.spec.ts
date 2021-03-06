import AppError from '@shared/errors/AppError';

import DraftMailProvider from '@shared/container/providers/MailProvider/drafts/DraftMailProvider';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';
import DraftUserTokensRepository from '../repositories/drafts/DraftUserTokensRepository';

import CreateUserService from './CreateUserService';

let draftUsersRepository: DraftUsersRepository;
let draftUserTokensRepository: DraftUserTokensRepository;

let draftMailProvider: DraftMailProvider;
let draftHashProvider: DraftHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftUserTokensRepository = new DraftUserTokensRepository();

    draftHashProvider = new DraftHashProvider();
    draftMailProvider = new DraftMailProvider();

    createUser = new CreateUserService(
      draftUsersRepository,
      draftHashProvider,
      draftMailProvider,
      draftUserTokensRepository,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same RA from another', async () => {
    await createUser.execute({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await expect(
      createUser.execute({
        ra: '111111',
        name: 'John Doe II',
        email: 'johndoeII@example.com',
        subjects: 'subject 2',
        position: 'teacher',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await expect(
      createUser.execute({
        ra: '222222',
        name: 'John Doe II',
        email: 'johndoe@example.com',
        subjects: 'subject 2',
        position: 'teacher',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
