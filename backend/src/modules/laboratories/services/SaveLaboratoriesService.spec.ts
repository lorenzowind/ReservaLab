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
    const laboratories_names = 'Laboratory 01, Laboratory 02, Laboratory 03';
    const laboratories_numbers = '01, 02, 03';

    expect(
      (
        await saveLaboratories.execute({
          laboratories_names,
          laboratories_numbers,
        })
      ).laboratories_names.split(', '),
    ).toHaveLength(3);
  });

  it('should not be able to save the laboratories names without respective numbers', async () => {
    const laboratories_names = 'Laboratory 01, Laboratory 02, Laboratory 03';
    const laboratories_numbers = '01, 02';

    await expect(
      saveLaboratories.execute({
        laboratories_names,
        laboratories_numbers,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
