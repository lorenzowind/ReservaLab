import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

import IUpdateAppointmentDTO from '../dtos/ICreateOrUpdateAppointmentDTO';

interface IRequest extends IUpdateAppointmentDTO {
  id: string;
}

@injectable()
class UpdateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    teacher_id,
    laboratory_number,
    year,
    month,
    day,
    time,
    subject,
    classroom,
    status,
  }: IRequest): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    const checkTeacherExists = await this.usersRepository.findById(teacher_id);

    if (!checkTeacherExists) {
      throw new AppError('Informed teacher does not exists.');
    } else if (!checkTeacherExists.subjects.split(', ').includes(subject)) {
      throw new AppError('Informed subject is not from the teacher.');
    }

    const appointmentDate = new Date(year, month - 1, day);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not update an appointment on a past date.');
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
          existingAppointment.laboratory_number === laboratory_number &&
          existingAppointment.id !== id
        ) {
          throw new AppError('This appointment is already booked.');
        }
      });
    });

    appointment.teacher_id = teacher_id;
    appointment.laboratory_number = laboratory_number;
    appointment.year = year;
    appointment.month = month;
    appointment.day = day;
    appointment.time = time;
    appointment.subject = subject;
    appointment.classroom = classroom;
    appointment.status = status;

    return this.appointmentsRepository.save(appointment);
  }
}

export default UpdateAppointmentService;
