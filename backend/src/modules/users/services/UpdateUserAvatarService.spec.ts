import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';
import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let draftStorageProvider: DraftStorageProvider;

let draftUsersRepository: DraftUsersRepository;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    draftStorageProvider = new DraftStorageProvider();

    draftUsersRepository = new DraftUsersRepository();

    updateUserAvatar = new UpdateUserAvatarService(
      draftUsersRepository,
      draftStorageProvider,
    );
  });

  it('should be able to update user with an avatar', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(draftStorageProvider, 'deleteFile');

    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'teacher',
      subjects: 'subject 1',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
