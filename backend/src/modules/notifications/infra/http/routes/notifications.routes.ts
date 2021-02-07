import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();

notificationsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().valid('schedules', 'support', 'programs'),
      description: Joi.string().required(),
      recipient_user_id: Joi.string().required(),
    },
  }),
  notificationsController.create,
);

notificationsRouter.get('/', ensureAuthenticated, notificationsController.show);

notificationsRouter.delete(
  '/:id',
  ensureAuthenticated,
  notificationsController.delete,
);

export default notificationsRouter;
