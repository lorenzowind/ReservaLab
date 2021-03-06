import AppError from '@shared/errors/AppError';

import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';

import DeleteAppointmentService from './DeleteAppointmentService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;

let deleteAppointment: DeleteAppointmentService;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();

    deleteAppointment = new DeleteAppointmentService(
      draftAppointmentsRepository,
    );
  });

  it('should not be able to delete a non existing appointment', async () => {
    await expect(
      deleteAppointment.execute('Non existing appointment id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
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

    const appointment = await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
      status: 'scheduled',
      observations: '',
    });

    await deleteAppointment.execute(appointment.id);

    expect(await draftAppointmentsRepository.findById(appointment.id)).toBe(
      undefined,
    );
  });
});
