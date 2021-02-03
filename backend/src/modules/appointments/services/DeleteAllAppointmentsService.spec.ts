import AppError from '@shared/errors/AppError';

import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';

import DeleteAllAppointmentsService from './DeleteAllAppointmentsService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;

let deleteAllAppointments: DeleteAllAppointmentsService;

describe('DeleteAllAppointments', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();

    deleteAllAppointments = new DeleteAllAppointmentsService(
      draftAppointmentsRepository,
    );
  });

  it('should be able to delete all appointments', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const year = 2020;
    const month = 9;
    const day = 7;

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day,
      time: '1',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day,
      time: '2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day,
      time: '3',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day,
      time: '4',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    deleteAllAppointments.execute('all');

    expect(
      await draftAppointmentsRepository.findAllAppointmentsByDate(
        year,
        month,
        day,
      ),
    ).toEqual([]);
  });

  it('should be able to delete only old appointments', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 4).getTime();
    });

    const teacher = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const year = 2020;
    const month = 9;
    const day = 5;

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day,
      time: '1',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day: day + 2,
      time: '2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day: day + 2,
      time: '3',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year,
      month,
      day: day + 2,
      time: '4',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    jest.spyOn(Date, 'now').mockClear();

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    deleteAllAppointments.execute('old');

    expect(
      await draftAppointmentsRepository.findAllAppointmentsByDate(
        year,
        month,
        day,
      ),
    ).toEqual([]);

    expect(
      await draftAppointmentsRepository.findAllAppointmentsByDate(
        year,
        month,
        day + 2,
      ),
    ).toHaveLength(3);
  });

  it('should not be able to delete appointments with invalid path parameter', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 7,
      time: '1',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await expect(
      deleteAllAppointments.execute('wrong parameter'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
