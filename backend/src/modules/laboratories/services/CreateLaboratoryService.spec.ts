import AppError from '@shared/errors/AppError';

import DraftLaboratoriesRepository from '@modules/laboratories/repositories/drafts/DraftLaboratoriesRepository';

import CreateLaboratoryService from './CreateLaboratoryService';

let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let createLaboratory: CreateLaboratoryService;

describe('CreateLaboratory', () => {
  beforeEach(() => {
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    createLaboratory = new CreateLaboratoryService(draftLaboratoriesRepository);
  });

  it('should be able to create a new laboratory', async () => {
    const laboratory = await createLaboratory.execute({
      name: 'Laboratory 1',
      number: 1,
    });

    expect(laboratory).toHaveProperty('id');
  });

  it('should not be able to create a new laboratory with the same name from another', async () => {
    await createLaboratory.execute({
      name: 'Laboratory 1',
      number: 1,
    });

    await expect(
      createLaboratory.execute({
        name: 'Laboratory 1',
        number: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new laboratory with the same number from another', async () => {
    await createLaboratory.execute({
      name: 'Laboratory 1',
      number: 1,
    });

    await expect(
      createLaboratory.execute({
        name: 'Laboratory 2',
        number: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
