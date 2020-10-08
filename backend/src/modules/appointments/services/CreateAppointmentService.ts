import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateAppointmentDTO from '../dtos/ICreateOrUpdateAppointmentDTO';

import Appointment from '../infra/typeorm/entities/Appointment';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    teacher_id,
    laboratory_number,
    year,
    month,
    day,
    time,
    subject,
    classroom,
    status,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const checkTeacherExists = await this.usersRepository.findById(teacher_id);

    if (!checkTeacherExists) {
      throw new AppError('Informed teacher does not exists.');
    } else if (!checkTeacherExists.subjects.split(', ').includes(subject)) {
      throw new AppError('Informed subject is not from the teacher.');
    }

    const appointmentDate = new Date(year, month - 1, day, 23, 59, 59);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    const existingAppointments = await this.appointmentsRepository.findAllAppointmentsByDate(
      year,
      month,
      day,
    );

    existingAppointments.map(existingAppointment => {
      time.split(', ').map(specificTime => {
        if (
          existingAppointment.time.split(', ').includes(specificTime) &&
          existingAppointment.laboratory_number === laboratory_number
        ) {
          throw new AppError('This appointment is already booked.');
        }
      });
    });

    const appointment = await this.appointmentsRepository.create({
      teacher_id,
      laboratory_number,
      year,
      month,
      day,
      time,
      subject,
      classroom,
      status,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
