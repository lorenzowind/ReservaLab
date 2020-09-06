import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsTeacher from '@shared/infra/http/middlewares/ensureIsTeacher';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

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
  ensureIsTeacher,
  celebrate({
    [Segments.BODY]: {
      laboratory_id: Joi.string().required(),
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
      time: Joi.string().max(24).required(),
      subject: Joi.string().max(39).required(),
      classroom: Joi.string().max(13).required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
      laboratory_id: Joi.string().required(),
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
      time: Joi.string().max(24).required(),
      subject: Joi.string().max(39).required(),
      classroom: Joi.string().max(13).required(),
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
  ensureIsAdmin,
  appointmentsController.clean,
);

export default appointmentsRouter;
