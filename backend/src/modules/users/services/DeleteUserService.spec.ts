import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import DeleteUserService from './DeleteUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let draftStorageProvider: DraftStorageProvider;

let draftUsersRepository: DraftUsersRepository;

let deleteUser: DeleteUserService;
let updateUserAvatar: UpdateUserAvatarService;

describe('DeleteUser', () => {
  beforeEach(() => {
    draftStorageProvider = new DraftStorageProvider();

    draftUsersRepository = new DraftUsersRepository();

    deleteUser = new DeleteUserService(
      draftUsersRepository,
      draftStorageProvider,
    );

    updateUserAvatar = new UpdateUserAvatarService(
      draftUsersRepository,
      draftStorageProvider,
    );
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(
      deleteUser.execute('Non existing user id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an user', async () => {
    await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      subjects: 'subject 2',
      position: 'teacher',
      password: '123456',
    });

    await deleteUser.execute(user.id);

    expect(await draftUsersRepository.findById(user.id)).toBe(undefined);
  });

  it('should be able to delete an user with his avatar', async () => {
    const deleteFile = jest.spyOn(draftStorageProvider, 'deleteFile');

    await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      subjects: 'subject 2',
      position: 'teacher',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await deleteUser.execute(user.id);

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(await draftUsersRepository.findById(user.id)).toBe(undefined);
  });
});
