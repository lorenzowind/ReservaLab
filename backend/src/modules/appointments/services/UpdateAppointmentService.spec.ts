import AppError from '@shared/errors/AppError';

import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLaboratoriesRepository from '@modules/laboratories/repositories/drafts/DraftLaboratoriesRepository';

import UpdateAppointmentService from './UpdateAppointmentService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;
let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let updateAppointment: UpdateAppointmentService;

describe('UpdateAppointment', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    updateAppointment = new UpdateAppointmentService(
      draftAppointmentsRepository,
      draftUsersRepository,
      draftLaboratoriesRepository,
    );
  });

  it('should be able to update an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1, subject 2',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 2',
    });

    const updatedAppointment = await updateAppointment.execute({
      id: appointment.id,
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 8,
      time: '3',
      subject: teacher.subjects.split(', ')[1],
      classroom: 'Classroom 2',
    });

    expect(updatedAppointment.day).toBe(8);
    expect(updatedAppointment.time).toBe('3');
    expect(updatedAppointment.subject).toBe('subject 2');
    expect(updatedAppointment.classroom).toBe('Classroom 2');
  });

  it('should not be able to update an appointment with wrong subject', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    await expect(
      updateAppointment.execute({
        id: appointment.id,
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year: 2020,
        month: 9,
        day: 7,
        time: '1, 2',
        subject: 'subject 2',
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointments on the same time of another', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const year = 2020;
    const month = 9;
    const day = 7;

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year,
      month,
      day,
      time: '3',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year,
      month,
      day,
      time: '4',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 2',
    });

    await expect(
      updateAppointment.execute({
        id: appointment.id,
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year: appointment.year,
        month: appointment.month,
        day: appointment.day,
        time: '1, 3',
        subject: appointment.subject,
        classroom: 'Classroom 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update from a non existing appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    await expect(
      updateAppointment.execute({
        id: 'non existing appointment id',
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year: 2020,
        month: 9,
        day: 7,
        time: '1',
        subject: teacher.subjects.split(', ')[0],
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointment with non existing teacher', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: '',
      classroom: 'Classroom 1',
    });

    await expect(
      updateAppointment.execute({
        id: appointment.id,
        teacher_id: 'non existing teacher id',
        laboratory_id: laboratory.id,
        year: appointment.year,
        month: appointment.month,
        day: appointment.day,
        time: appointment.time,
        subject: '',
        classroom: appointment.classroom,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointment with non existing laboratory', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: '',
      classroom: 'Classroom 1',
    });

    await expect(
      updateAppointment.execute({
        id: appointment.id,
        teacher_id: teacher.id,
        laboratory_id: 'non existing laboratory id',
        year: appointment.year,
        month: appointment.month,
        day: appointment.day,
        time: appointment.time,
        subject: teacher.subjects.split(', ')[0],
        classroom: appointment.classroom,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an appointment with a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 6,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    await expect(
      updateAppointment.execute({
        id: appointment.id,
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year: appointment.year,
        month: appointment.month,
        day: 5,
        time: appointment.time,
        subject: appointment.subject,
        classroom: appointment.classroom,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
