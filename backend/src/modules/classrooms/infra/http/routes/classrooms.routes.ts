import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ClassroomsController from '../controllers/ClassroomsController';

const classroomsRouter = Router();

const classroomsController = new ClassroomsController();

classroomsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      classrooms: Joi.string().required(),
    },
  }),
  classroomsController.save,
);

classroomsRouter.get('/', ensureAuthenticated, classroomsController.show);

export default classroomsRouter;
