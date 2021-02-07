import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async findAllNotificationsByUserId(
    user_id: string,
  ): Promise<Notification[]> {
    const findNotifications = await this.ormRepository.find({
      where: { recipient_user_id: user_id },
    });

    return findNotifications;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const findNotification = await this.ormRepository.findOne(id);

    return findNotification;
  }

  public async create(
    notification: ICreateNotificationDTO,
  ): Promise<Notification> {
    const createNotification = this.ormRepository.create(notification);

    await this.ormRepository.save(createNotification);

    return createNotification;
  }

  public async remove(notification: Notification): Promise<void> {
    await this.ormRepository.remove(notification);
  }
}

export default NotificationsRepository;
