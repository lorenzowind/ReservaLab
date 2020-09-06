import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import ShowUserService from './ShowUserService';

let draftUsersRepository: DraftUsersRepository;

let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    showUser = new ShowUserService(draftUsersRepository);
  });

  it('should be able to show the user data', async () => {
    const createdUser = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const user = await showUser.execute({
      user_id: createdUser.id,
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the user data from non existing user', async () => {
    expect(
      showUser.execute({
        user_id: 'non existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
