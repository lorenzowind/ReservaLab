import AppError from '@shared/errors/AppError';

import DraftLaboratoriesRepository from '../repositories/drafts/DraftLaboratoriesRepository';

import DeleteLaboratoryService from './DeleteLaboratoryService';

let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let deleteLaboratory: DeleteLaboratoryService;

describe('DeleteLaboratory', () => {
  beforeEach(() => {
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    deleteLaboratory = new DeleteLaboratoryService(draftLaboratoriesRepository);
  });

  it('should not be able to delete a non existing laboratory', async () => {
    await expect(
      deleteLaboratory.execute('Non existing holiday id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a laboratory', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const laboratory = await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    await deleteLaboratory.execute(laboratory.id);

    expect(await draftLaboratoriesRepository.findById(laboratory.id)).toBe(
      undefined,
    );
  });
});
