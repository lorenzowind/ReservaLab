import { v4 } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateOrUpdateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default class DraftAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllAppointmentsByDate(
    year: number,
    month: number,
    day: number,
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.year === year &&
        appointment.month === month &&
        appointment.day === day
      );
    });

    return appointments;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(
      findAppointment => findAppointment.id === id,
    );

    return appointment;
  }

  public async create(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4() }, appointmentData);

    this.appointments.push(appointment);

    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    const findIndex = this.appointments.findIndex(
      findAppointment => findAppointment.id === appointment.id,
    );

    this.appointments[findIndex] = appointment;

    return appointment;
  }

  public async remove(appointment: Appointment): Promise<void> {
    const findIndex = this.appointments.findIndex(
      findAppointment => findAppointment.id === appointment.id,
    );

    this.appointments.splice(findIndex, 1);
  }
}
