import AppError from '@shared/errors/AppError';

import FakeClassroomsRepository from '../repositories/fakes/FakeClassroomsRepository';

import SaveClassroomsService from './SaveClassroomsService';

let fakeClassroomsRepository: FakeClassroomsRepository;

let saveClassrooms: SaveClassroomsService;

describe('SaveClassrooms', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();

    saveClassrooms = new SaveClassroomsService(fakeClassroomsRepository);
  });

  it('should be able to save the classrooms', async () => {
    const classrooms = 'Classroom 01, Classroom 02, Classroom 03';

    expect(
      (
        await saveClassrooms.execute({
          classrooms,
        })
      ).classrooms.split(', '),
    ).toHaveLength(3);
  });

  it('should not be able to save the classrooms with duplicates', async () => {
    const classrooms = 'Classroom 01, Classroom 02, Classroom 03, Classroom 01';

    await expect(
      saveClassrooms.execute({
        classrooms,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
