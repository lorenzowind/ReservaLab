import FakeLaboratoriesRepository from '../repositories/fakes/FakeLaboratoriesRepository';

import GetLaboratoriesService from './GetLaboratoriesService';

let fakeLaboratoriesRepository: FakeLaboratoriesRepository;

let getLaboratories: GetLaboratoriesService;

describe('GetLaboratories', () => {
  beforeEach(() => {
    fakeLaboratoriesRepository = new FakeLaboratoriesRepository();

    getLaboratories = new GetLaboratoriesService(fakeLaboratoriesRepository);
  });

  it('should be able to get the laboratories', async () => {
    await fakeLaboratoriesRepository.save({
      laboratories_names: 'Laboratory 01, Laboratory 02, Laboratory 03',
      laboratories_numbers: '01, 02, 03',
    });

    expect(
      (await getLaboratories.execute()).laboratories_names.split(', '),
    ).toHaveLength(3);
  });
});
