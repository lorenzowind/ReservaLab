import AppError from '@shared/errors/AppError';

import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';

import UpdateAppointmentService from './UpdateAppointmentStatusService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;

let updateAppointment: UpdateAppointmentService;

describe('UpdateAppointmentStatus', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();

    updateAppointment = new UpdateAppointmentService(
      draftAppointmentsRepository,
    );
  });

  it('should be able to update an appointment status', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 6).getTime();
    });

    const teacher = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: 'subject 1, subject 2',
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
      classroom: 'Classroom 2',
      status: 'scheduled',
      observations: '',
    });

    const updatedAppointment = await updateAppointment.execute({
      id: appointment.id,
      status: 'presence',
    });

    expect(updatedAppointment.status).toBe('presence');
  });

  it('should not be able to update from a non existing appointment', async () => {
    await expect(
      updateAppointment.execute({
        id: 'non existing appointment id',
        status: 'presence',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
