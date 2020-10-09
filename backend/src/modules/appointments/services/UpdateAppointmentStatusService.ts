import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

import IUpdateAppointmentStatusDTO from '../dtos/IUpdateAppointmentStatusDTO';

interface IRequest extends IUpdateAppointmentStatusDTO {
  id: string;
}

@injectable()
class UpdateAppointmentStatusService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id, status }: IRequest): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    appointment.status = status;

    return this.appointmentsRepository.save(appointment);
  }
}

export default UpdateAppointmentStatusService;
