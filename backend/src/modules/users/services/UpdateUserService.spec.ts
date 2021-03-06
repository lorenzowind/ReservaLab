import AppError from '@shared/errors/AppError';

import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import UpdateUserService from './UpdateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftHashProvider: DraftHashProvider;

let UpdateUser: UpdateUserService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftHashProvider = new DraftHashProvider();

    UpdateUser = new UpdateUserService(draftUsersRepository, draftHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      ra: '111111',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      old_password: '',
      new_password: '',
    });

    expect(updatedUser.name).toBe('John Doe II');
    expect(updatedUser.email).toBe('johndoeII@example.com');
  });

  it('should not be able to update from a non existing user', async () => {
    expect(
      UpdateUser.execute({
        id: 'non existing user',
        ra: '111111',
        name: 'John Doe',
        email: 'johndoe@example.com',
        position: 'teacher',
        subjects: 'subject 1',
        old_password: '123456',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user RA', async () => {
    await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        ra: '111111',
        name: user.name,
        email: user.email,
        subjects: user.subjects,
        position: user.position,
        old_password: '123456',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user email', async () => {
    await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        ra: user.ra,
        name: user.name,
        email: 'johndoe@example.com',
        subjects: user.subjects,
        position: user.position,
        old_password: '123456',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      ra: user.ra,
      name: user.name,
      email: user.email,
      subjects: user.subjects,
      position: user.position,
      old_password: '123456',
      new_password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password with a non matched old password', async () => {
    const user = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        ra: user.ra,
        name: user.name,
        email: user.email,
        subjects: user.subjects,
        position: user.position,
        old_password: '123123',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
