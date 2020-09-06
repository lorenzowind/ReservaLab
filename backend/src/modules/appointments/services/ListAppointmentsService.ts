import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    year: number,
    month: number,
    day: number,
  ): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllAppointmentsByDate(
      year,
      month,
      day,
    );

    return appointments;
  }
}

export default ListAppointmentsService;
