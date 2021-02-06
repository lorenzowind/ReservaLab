import AppError from '@shared/errors/AppError';

import FakeSchedulesRepository from '../repositories/fakes/FakeSchedulesRepository';

import SaveSchedulesService from './SaveSchedulesService';

let fakeSchedulesRepository: FakeSchedulesRepository;

let saveSchedules: SaveSchedulesService;

describe('SaveSchedules', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeSchedulesRepository();

    saveSchedules = new SaveSchedulesService(fakeSchedulesRepository);
  });

  it('should be able to save the schedules', async () => {
    const data = [
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
    ];

    expect(await saveSchedules.execute(data)).toHaveLength(3);
  });

  it('should not be able to save the schedules with equal informations', async () => {
    const data = [
      {
        schedule_name: '1st Time',
        schedule_begin: '07:10',
        schedule_end: '08:10',
      },
      {
        schedule_name: '1st Time',
        schedule_begin: '08:10',
        schedule_end: '09:00',
      },
    ];

    await expect(saveSchedules.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
