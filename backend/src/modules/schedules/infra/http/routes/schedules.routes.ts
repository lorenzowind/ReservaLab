import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import SchedulesController from '../controllers/SchedulesController';

const schedulesRouter = Router();

const schedulesController = new SchedulesController();

schedulesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      data: Joi.array()
        .required()
        .items({
          schedule_name: Joi.string().allow(''),
          schedule_begin: Joi.string().required(),
          schedule_end: Joi.string().required(),
        }),
    },
  }),
  schedulesController.save,
);

schedulesRouter.get('/', schedulesController.show);

export default schedulesRouter;
