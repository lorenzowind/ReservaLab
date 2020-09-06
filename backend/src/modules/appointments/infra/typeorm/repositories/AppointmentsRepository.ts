import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateOrUpdateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllAppointmentsByDate(
    year: number,
    month: number,
    day: number,
  ): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        year,
        month,
        day,
      },
    });

    return appointments;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async create(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    Object.assign(appointment, { id: v4() });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }

  public async remove(appointment: Appointment): Promise<void> {
    await this.ormRepository.remove(appointment);
  }

  public async removeAll(): Promise<void> {
    await this.ormRepository.clear();
  }

  public async removeOld(): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(Appointment)
      .where('concat_ws("-",year,month,day) < curdate()')
      .execute();
  }
}

export default AppointmentsRepository;
