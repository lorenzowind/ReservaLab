import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';

import GetSubjectsService from './GetSubjectsService';

let fakeSubjectsRepository: FakeSubjectsRepository;

let getSubjects: GetSubjectsService;

describe('GetSubjects', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    getSubjects = new GetSubjectsService(fakeSubjectsRepository);
  });

  it('should be able to get the subjects', async () => {
    await fakeSubjectsRepository.save({
      subjects: 'Subject 01, Subject 02, Subject 03',
    });

    expect((await getSubjects.execute()).subjects.split(', ')).toHaveLength(3);
  });
});
