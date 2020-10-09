import { v4 } from 'uuid';
import { isBefore } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

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

  public async removeAll(): Promise<void> {
    this.appointments = [];
  }

  public async removeOld(): Promise<void> {
    this.appointments = this.appointments.filter(appointment => {
      const { year, month, day } = appointment;

      return !isBefore(new Date(year, month - 1, day), Date.now());
    });
  }
}
