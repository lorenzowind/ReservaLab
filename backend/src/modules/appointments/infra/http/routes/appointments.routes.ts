import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.get(
  '/all',
  ensureAuthenticated,
  appointmentsController.show,
);

appointmentsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      laboratory_number: Joi.number().required(),
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
      time: Joi.string().max(24).required(),
      subject: Joi.string().max(39).required(),
      classroom: Joi.string().max(13).required(),
      status: Joi.string().required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
  }),
  appointmentsController.update,
);

appointmentsRouter.delete(
  '/:id',
  ensureAuthenticated,
  appointmentsController.delete,
);

appointmentsRouter.delete(
  '/clean/:operation',
  ensureAuthenticated,
  appointmentsController.clean,
);

export default appointmentsRouter;
