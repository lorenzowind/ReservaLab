import AppError from '@shared/errors/AppError';

import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';

import SaveSubjectsService from './SaveSubjectsService';

let fakeSubjectsRepository: FakeSubjectsRepository;

let saveSubjects: SaveSubjectsService;

describe('SaveSubjects', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    saveSubjects = new SaveSubjectsService(fakeSubjectsRepository);
  });

  it('should be able to save the subjects', async () => {
    const subjects = 'Subject 01, Subject 02, Subject 03';

    expect(
      (
        await saveSubjects.execute({
          subjects,
        })
      ).subjects.split(', '),
    ).toHaveLength(3);
  });

  it('should not be able to save the subjects with duplicates', async () => {
    const subjects = 'Subject 01, Subject 02, Subject 03, Subject 01';

    await expect(
      saveSubjects.execute({
        subjects,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
