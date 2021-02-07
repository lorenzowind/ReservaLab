import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '../repositories/INotificationsRepository';

@injectable()
class DeleteNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new AppError('Notification not found.');
    }

    await this.notificationsRepository.remove(notification);
  }
}

export default DeleteNotificationService;
