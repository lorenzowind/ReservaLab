import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '../repositories/INotificationsRepository';

import Notification from '../infra/typeorm/schemas/Notification';

@injectable()
class GetNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<Notification[]> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('Informed user does not exists.');
    }

    const notifications = await this.notificationsRepository.findAllNotificationsByUserId(
      user_id,
    );

    return notifications;
  }
}

export default GetNotificationsService;
