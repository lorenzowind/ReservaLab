import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';

import laboratoriesRouter from '@modules/laboratories/infra/http/routes/laboratories.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/laboratories', laboratoriesRouter);

export default routes;
