import AppError from '@shared/errors/AppError';

import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLaboratoriesRepository from '@modules/laboratories/repositories/drafts/DraftLaboratoriesRepository';

import CreateAppointmentService from './CreateAppointmentService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;
let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    createAppointment = new CreateAppointmentService(
      draftAppointmentsRepository,
      draftUsersRepository,
      draftLaboratoriesRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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

    const appointment = await createAppointment.execute({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new appointment with wrong subject', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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
      createAppointment.execute({
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

  it('should be able to create two appointments consecutively', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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

    await createAppointment.execute({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year,
      month,
      day,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    const appointment = await createAppointment.execute({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year,
      month,
      day,
      time: '3, 4',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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
    const time = '1, 2';

    await createAppointment.execute({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year,
      month,
      day,
      time,
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    await expect(
      createAppointment.execute({
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year,
        month,
        day,
        time,
        subject: teacher.subjects.split(', ')[0],
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with non existing teacher', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    await expect(
      createAppointment.execute({
        teacher_id: 'non existing teacher id',
        laboratory_id: laboratory.id,
        year: 2020,
        month: 9,
        day: 7,
        time: '1, 2',
        subject: '',
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment with non existing laboratory', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        teacher_id: teacher.id,
        laboratory_id: 'non existing laboratory id',
        year: 2020,
        month: 9,
        day: 7,
        time: '1, 2',
        subject: teacher.subjects.split(', ')[0],
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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
      createAppointment.execute({
        teacher_id: teacher.id,
        laboratory_id: laboratory.id,
        year: 2020,
        month: 9,
        day: 5,
        time: '1, 2',
        subject: teacher.subjects.split(', ')[0],
        classroom: 'Classroom 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment for today', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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

    const appointment = await createAppointment.execute({
      teacher_id: teacher.id,
      laboratory_id: laboratory.id,
      year: 2020,
      month: 9,
      day: 6,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    expect(appointment).toHaveProperty('id');
  });
});
