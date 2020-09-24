import DraftAppointmentsRepository from '@modules/appointments/repositories/drafts/DraftAppointmentsRepository';
import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
// import DraftLaboratoriesRepository from '@modules/laboratories/repositories/drafts/DraftLaboratoriesRepository';

import ListAppointmentsService from './ListAppointmentsService';

let draftAppointmentsRepository: DraftAppointmentsRepository;
let draftUsersRepository: DraftUsersRepository;
// let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let listAppointments: ListAppointmentsService;

describe('ListAppointments', () => {
  beforeEach(() => {
    draftAppointmentsRepository = new DraftAppointmentsRepository();
    draftUsersRepository = new DraftUsersRepository();
    // draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    listAppointments = new ListAppointmentsService(draftAppointmentsRepository);
  });

  it('should be able to list all the appointments of today', async () => {
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

    // const laboratory = await draftLaboratoriesRepository.create({
    //   name: 'Laboratory 1',
    //   number: 1,
    // });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 7,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 7,
      time: '3, 4',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 2',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 7,
      time: '5, 6',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 3',
    });

    await draftAppointmentsRepository.create({
      teacher_id: teacher.id,
      laboratory_number: 1,
      year: 2020,
      month: 9,
      day: 8,
      time: '1, 2',
      subject: teacher.subjects.split(', ')[0],
      classroom: 'Classroom 1',
    });

    const response = await listAppointments.execute(2020, 9, 7);

    expect(response).toHaveLength(3);
  });
});
