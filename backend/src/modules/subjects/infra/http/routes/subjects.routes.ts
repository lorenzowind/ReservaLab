import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import SubjectsController from '../controllers/SubjectsController';

const subjectsRouter = Router();

const subjectsController = new SubjectsController();

subjectsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      subjects: Joi.string().required(),
    },
  }),
  subjectsController.save,
);

subjectsRouter.get('/', ensureAuthenticated, subjectsController.show);

export default subjectsRouter;
