import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateOrUpdateAppointmentDTO';

export default interface ILaboratoriesRepository {
  findAllAppointmentsByDate(
    year: number,
    month: number,
    day: number,
  ): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
  remove(appointment: Appointment): Promise<void>;
}
