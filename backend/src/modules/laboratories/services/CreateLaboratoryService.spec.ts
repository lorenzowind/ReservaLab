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
});
