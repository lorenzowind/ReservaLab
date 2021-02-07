import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import FakeNotificationsRepository from '../repositories/fakes/FakeNotificationsRepository';

import GetNotificationsService from './GetNotificationsService';

let draftUsersRepository: DraftUsersRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let getNotifications: GetNotificationsService;

describe('GetNotifications', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    getNotifications = new GetNotificationsService(
      fakeNotificationsRepository,
      draftUsersRepository,
    );
  });

  it('should be able to get the notifications', async () => {
    const sender = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: '',
      position: 'admin',
      password: '123456',
    });

    const firstRecipient = await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      subjects: 'Subject 01',
      position: 'teacher',
      password: '123456',
    });

    const secondRecipient = await draftUsersRepository.create({
      ra: '333333',
      name: 'John Doe III',
      email: 'johndoeIII@example.com',
      subjects: 'Subject 01',
      position: 'teacher',
      password: '123456',
    });

    await fakeNotificationsRepository.create({
      type: 'schedules',
      description: 'Notification description',
      sender_user_id: sender.id,
      recipient_user_id: firstRecipient.id,
    });

    await fakeNotificationsRepository.create({
      type: 'schedules',
      description: 'Notification description II',
      sender_user_id: sender.id,
      recipient_user_id: firstRecipient.id,
    });

    await fakeNotificationsRepository.create({
      type: 'schedules',
      description: 'Notification description III',
      sender_user_id: sender.id,
      recipient_user_id: firstRecipient.id,
    });

    await fakeNotificationsRepository.create({
      type: 'schedules',
      description: 'Notification description IV',
      sender_user_id: sender.id,
      recipient_user_id: secondRecipient.id,
    });

    expect(await getNotifications.execute(firstRecipient.id)).toHaveLength(3);
  });

  it('should not be able to get the notifications with non existing user id', async () => {
    await expect(
      getNotifications.execute('Non existing user id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
