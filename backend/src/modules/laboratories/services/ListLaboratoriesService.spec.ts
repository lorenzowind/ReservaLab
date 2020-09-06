import DraftLaboratoriesRepository from '../repositories/drafts/DraftLaboratoriesRepository';

import ListLaboratoriesService from './ListLaboratoriesService';

let draftLaboratoriesRepository: DraftLaboratoriesRepository;

let listLaboratories: ListLaboratoriesService;

describe('ListHolidays', () => {
  beforeEach(() => {
    draftLaboratoriesRepository = new DraftLaboratoriesRepository();

    listLaboratories = new ListLaboratoriesService(draftLaboratoriesRepository);
  });

  it('should be able to list all the laboratories from the first page', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    const response = await listLaboratories.execute('', 1);

    expect(response).toHaveLength(2);
  });

  it('should be able to validate a non positive page number', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    const response = await listLaboratories.execute('', -1);

    expect(response).toHaveLength(1);
  });

  it('should be able to list all the laboratories from the second page', async () => {
    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 3',
      number: 3,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 4',
      number: 4,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 5',
      number: 5,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 6',
      number: 6,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 7',
      number: 7,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 8',
      number: 8,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 9',
      number: 9,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 10',
      number: 10,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 11',
      number: 11,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 12',
      number: 12,
    });

    const response = await listLaboratories.execute('', 2);

    expect(response).toHaveLength(2);
  });

  it('should be able to list all the laboratories from the first page which includes a search string', async () => {
    const laboratorySearch = 'Laboratory Searching';

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 1',
      number: 1,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 2',
      number: 2,
    });

    await draftLaboratoriesRepository.create({
      name: laboratorySearch,
      number: 3,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 4',
      number: 4,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 5',
      number: 5,
    });

    await draftLaboratoriesRepository.create({
      name: 'Laboratory 6',
      number: 6,
    });

    const response = await listLaboratories.execute(laboratorySearch, 1);

    expect(response).toHaveLength(1);
  });
});
