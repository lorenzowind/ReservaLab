import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import LaboratoriesController from '../controllers/LaboratoriesController';

const laboratoriesRouter = Router();

const laboratoriesController = new LaboratoriesController();

laboratoriesRouter.get(
  '/all',
  ensureAuthenticated,
  laboratoriesController.show,
);

laboratoriesRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      number: Joi.number().required(),
    },
  }),
  laboratoriesController.create,
);

laboratoriesRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      number: Joi.number().required(),
    },
  }),
  laboratoriesController.update,
);

laboratoriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  laboratoriesController.delete,
);

export default laboratoriesRouter;
