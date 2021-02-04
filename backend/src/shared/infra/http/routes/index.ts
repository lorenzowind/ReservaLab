import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import subjectsRouter from '@modules/subjects/infra/http/routes/subjects.routes';
import laboratoriesRouter from '@modules/laboratories/infra/http/routes/laboratories.routes';
import classroomRouter from '@modules/classroom/infra/http/routes/classroom.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/laboratories', laboratoriesRouter);
routes.use('/classrooms', classroomRouter);

export default routes;
