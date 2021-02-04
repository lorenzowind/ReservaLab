import AppError from '@shared/errors/AppError';

import FakeLaboratoriesRepository from '../repositories/fakes/FakeLaboratoriesRepository';

import SaveLaboratoriesService from './SaveLaboratoriesService';

let fakeLaboratoriesRepository: FakeLaboratoriesRepository;

let saveLaboratories: SaveLaboratoriesService;

describe('SaveLaboratories', () => {
  beforeEach(() => {
    fakeLaboratoriesRepository = new FakeLaboratoriesRepository();

    saveLaboratories = new SaveLaboratoriesService(fakeLaboratoriesRepository);
  });

  it('should be able to save the laboratories', async () => {
    const laboratories = 'Laboratory 01, Laboratory 02, Laboratory 03';

    expect(
      (
        await saveLaboratories.execute({
          laboratories,
        })
      ).laboratories.split(', '),
    ).toHaveLength(3);
  });

  it('should not be able to save the laboratories with duplicates', async () => {
    const laboratories =
      'Laboratory 01, Laboratory 02, Laboratory 03, Laboratory 01';

    await expect(
      saveLaboratories.execute({
        laboratories,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
