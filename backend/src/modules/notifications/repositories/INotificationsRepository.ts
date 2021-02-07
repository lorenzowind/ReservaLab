import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  findAllNotificationsByUserId(user_id: string): Promise<Notification[]>;
  findById(id: string): Promise<Notification | undefined>;
  create(notification: ICreateNotificationDTO): Promise<Notification>;
  remove(notification: Notification): Promise<void>;
}
