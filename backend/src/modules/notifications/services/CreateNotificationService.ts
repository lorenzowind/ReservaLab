import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '../repositories/INotificationsRepository';

import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

import Notification from '../infra/typeorm/schemas/Notification';

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    type,
    description,
    recipient_user_id,
    sender_user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const checkUserExists = await this.usersRepository.findById(
      recipient_user_id,
    );

    if (!checkUserExists) {
      throw new AppError('Informed recipient user does not exists.');
    }

    const notification = await this.notificationsRepository.create({
      type,
      description,
      recipient_user_id,
      sender_user_id,
    });

    return notification;
  }
}

export default CreateNotificationService;
