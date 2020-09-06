import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class DeleteAllAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(operation: string): Promise<void> {
    switch (operation) {
      case 'all': {
        await this.appointmentsRepository.removeAll();
        break;
      }
      case 'old': {
        await this.appointmentsRepository.removeOld();
        break;
      }
      default: {
        throw new AppError('Path parameter is not valid.');
      }
    }
  }
}

export default DeleteAllAppointmentsService;
