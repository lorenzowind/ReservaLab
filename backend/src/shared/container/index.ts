import { container } from 'tsyringe';

import './providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';
import LaboratoriesRepository from '@modules/laboratories/infra/typeorm/repositories/LaboratoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ILaboratoriesRepository>(
  'LaboratoriesRepository',
  LaboratoriesRepository,
);
