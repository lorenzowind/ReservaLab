import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';
import DeleteNotificationService from '@modules/notifications/services/DeleteNotificationService';
import GetNotificationsService from '@modules/notifications/services/GetNotificationsService';

export default class NotificationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const sender_user_id = request.user.id;
    const { type, description, recipient_user_id } = request.body;

    const createNotification = container.resolve(CreateNotificationService);

    const notification = await createNotification.execute({
      type,
      description,
      recipient_user_id,
      sender_user_id,
    });

    return response.json(notification);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteNotification = container.resolve(DeleteNotificationService);

    await deleteNotification.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getNotifications = container.resolve(GetNotificationsService);

    const data = await getNotifications.execute(user_id);

    return response.json(data);
  }
}
