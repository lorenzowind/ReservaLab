import AppError from '@shared/errors/AppError';

import DraftLaboratoriesRepository from '@modules/laboratories/repositories/drafts/DraftLaboratoriesRepository';

import UpdateLaboratoryService from './UpdateLaboratoryService';

let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let updateLaboratory: UpdateLaboratoryService;

describe('UpdateLaboratory', () => {
  beforeEach(() => {
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    updateLaboratory = new UpdateLaboratoryService(draftLaboratoriesRepository);
  });

  it('should be able to update the laboratory', async () => {
    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const updatedLaboratory = await updateLaboratory.execute({
      id: laboratory.id,
      name: 'Laboratory 2',
      number: 2,
    });

    expect(updatedLaboratory.name).toBe('Laboratory 2');
    expect(updatedLaboratory.number).toBe(2);
  });

  it('should not be able to update from a non existing laboratory', async () => {
    expect(
      updateLaboratory.execute({
        id: 'non existing holiday',
        name: 'Laboratory 2',
        number: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another laboratory name', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    await expect(
      updateLaboratory.execute({
        id: laboratory.id,
        name: 'Laboratory 1',
        number: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another laboratory number', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    await expect(
      updateLaboratory.execute({
        id: laboratory.id,
        name: 'Laboratory 2',
        number: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
