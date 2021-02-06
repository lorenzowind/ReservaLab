import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';

import GetSchedulesService from './GetSchedulesService';

let fakeSchedulesRepository: FakeSchedulesRepository;

let getSchedules: GetSchedulesService;

describe('GetSchedules', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();

    getSchedules = new GetSchedulesService(fakeSchedulesRepository);
  });

  it('should be able to get the schedules', async () => {
    await fakeSchedulesRepository.save([
      {
        schedule_name: '1st Time',
        schedule_begin: '07:10',
        schedule_end: '08:10',
      },
      {
        schedule_name: '2st Time',
        schedule_begin: '08:10',
        schedule_end: '09:00',
      },
      {
        schedule_name: '3st Time',
        schedule_begin: '09:10',
        schedule_end: '10:00',
      },
    ]);

    expect(await getSchedules.execute()).toHaveLength(3);
  });
});
