import FakeClassroomsRepository from '../repositories/fakes/FakeClassroomsRepository';

import GetClassroomsService from './GetClassroomsService';

let fakeClassroomsRepository: FakeClassroomsRepository;

let getClassrooms: GetClassroomsService;

describe('GetClassrooms', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();

    getClassrooms = new GetClassroomsService(fakeClassroomsRepository);
  });

  it('should be able to get the classrooms', async () => {
    await fakeClassroomsRepository.save({
      classrooms: 'Classroom 01, Classroom 02, Classroom 03',
    });

    expect((await getClassrooms.execute()).classrooms.split(', ')).toHaveLength(
      3,
    );
  });
});
