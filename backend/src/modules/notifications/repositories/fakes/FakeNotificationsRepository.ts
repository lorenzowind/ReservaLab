import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async findAllNotificationsByUserId(
    user_id: string,
  ): Promise<Notification[]> {
    return this.notifications.filter(
      notification => notification.recipient_user_id === user_id,
    );
  }

  public async findById(id: string): Promise<Notification | undefined> {
    return this.notifications.find(notification => notification.id === id);
  }

  public async create(
    notification: ICreateNotificationDTO,
  ): Promise<Notification> {
    const createNotification = new Notification();

    Object.assign(
      createNotification,
      {
        id: new ObjectID(),
      },
      notification,
    );

    this.notifications.push(createNotification);

    return createNotification;
  }

  public async remove(notification: Notification): Promise<void> {
    const findIndex = this.notifications.findIndex(
      findNotification => findNotification.id === notification.id,
    );

    this.notifications.splice(findIndex, 1);
  }
}
