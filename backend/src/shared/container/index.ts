import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';
import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';
import LaboratoriesRepository from '@modules/laboratories/infra/typeorm/repositories/LaboratoriesRepository';

import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';
import ClassroomsRepository from '@modules/classrooms/infra/typeorm/repositories/ClassroomsRepository';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<ISubjectsRepository>(
  'SubjectsRepository',
  SubjectsRepository,
);

container.registerSingleton<ILaboratoriesRepository>(
  'LaboratoriesRepository',
  LaboratoriesRepository,
);

container.registerSingleton<IClassroomsRepository>(
  'ClassroomsRepository',
  ClassroomsRepository,
);

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);
