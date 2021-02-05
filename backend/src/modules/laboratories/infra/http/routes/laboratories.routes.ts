import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import LaboratoriesController from '../controllers/LaboratoriesController';

const laboratoriesRouter = Router();

const laboratoriesController = new LaboratoriesController();

laboratoriesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      laboratories_names: Joi.string().required(),
      laboratories_numbers: Joi.string().required(),
    },
  }),
  laboratoriesController.save,
);

laboratoriesRouter.get('/', laboratoriesController.show);

export default laboratoriesRouter;
