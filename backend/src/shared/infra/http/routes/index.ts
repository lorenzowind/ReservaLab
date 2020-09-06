import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';

import laboratoriesRouter from '@modules/laboratories/infra/http/routes/laboratories.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/laboratories', laboratoriesRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
