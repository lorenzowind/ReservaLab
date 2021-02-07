import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import FakeNotificationsRepository from '../repositories/fakes/FakeNotificationsRepository';

import DeleteNotificationService from './DeleteNotificationService';

let draftUsersRepository: DraftUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let deleteNotification: DeleteNotificationService;

describe('DeleteNotification', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    deleteNotification = new DeleteNotificationService(
      fakeNotificationsRepository,
    );
  });

  it('should not be able to delete a non existing notification', async () => {
    await expect(
      deleteNotification.execute('Non existing notification id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a notification', async () => {
    const sender = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: '',
      position: 'admin',
      password: '123456',
    });

    const recipient = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      subjects: 'Subject 01',
      position: 'teacher',
      password: '123456',
    });

    const notification = await fakeNotificationsRepository.create({
      type: 'schedules',
      description: 'Notification description',
      sender_user_id: sender.id,
      recipient_user_id: recipient.id,
    });

    await deleteNotification.execute(notification.id);

    expect(await fakeNotificationsRepository.findById(notification.id)).toBe(
      undefined,
    );
  });
});
