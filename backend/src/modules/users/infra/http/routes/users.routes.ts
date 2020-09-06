import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureIsAdmin from '@shared/infra/http/middlewares/ensureIsAdmin';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      position: Joi.string().required(),
      subjects: Joi.string().when('position', {
        is: 'teacher',
        then: Joi.required(),
        otherwise: Joi.allow(''),
      }),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      position: Joi.string().required(),
      subjects: Joi.string().when('position', {
        is: 'teacher',
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      password: Joi.string().min(6),
    },
  }),
  usersController.update,
);

usersRouter.delete('/:id', ensureAuthenticated, usersController.delete);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  ensureIsAdmin,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
