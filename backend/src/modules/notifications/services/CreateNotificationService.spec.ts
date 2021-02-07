import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import FakeNotificationsRepository from '../repositories/fakes/FakeNotificationsRepository';

import CreateNotificationService from './CreateNotificationService';

let draftUsersRepository: DraftUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let createNotification: CreateNotificationService;

describe('CreateNotification', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createNotification = new CreateNotificationService(
      fakeNotificationsRepository,
      draftUsersRepository,
    );
  });

  it('should be able to create a notification', async () => {
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

    const notification = await createNotification.execute({
      type: 'schedules',
      description: 'Notification description',
      sender_user_id: sender.id,
      recipient_user_id: recipient.id,
    });

    expect(notification).toHaveProperty('id');
  });

  it('should not be able to create a notification with non existing recipient user', async () => {
    const sender = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: '',
      position: 'admin',
      password: '123456',
    });

    await expect(
      createNotification.execute({
        type: 'schedules',
        description: 'Notification description',
        sender_user_id: sender.id,
        recipient_user_id: 'non existing recipient user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
