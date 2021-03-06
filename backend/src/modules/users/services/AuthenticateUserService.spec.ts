import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';
import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftHashProvider: DraftHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftHashProvider = new DraftHashProvider();

    authenticateUser = new AuthenticateUserService(
      draftUsersRepository,
      draftHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      ra: '111111',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        ra: '111111',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        ra: '111111',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
