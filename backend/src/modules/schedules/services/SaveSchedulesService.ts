import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Schedule from '../infra/typeorm/schemas/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

import ISaveSchedulesDTO from '../dtos/ISaveSchedulesDTO';

@injectable()
class SaveSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(data: ISaveSchedulesDTO[]): Promise<Schedule[]> {
    for (let i = 0; i < data.length; i += 1) {
      const foundSchedule = data.find(
        (schedule, index) =>
          (schedule.schedule_name === data[i].schedule_name ||
            schedule.schedule_begin === data[i].schedule_begin ||
            schedule.schedule_end === data[i].schedule_end) &&
          index !== i,
      );

      if (foundSchedule) {
        throw new AppError('Informed schedules are not valid.');
      }
    }

    const currentSchedules = await this.schedulesRepository.get();

    if (currentSchedules) {
      await this.schedulesRepository.clear();
    }

    const result = await this.schedulesRepository.save(data);

    return result;
  }
}

export default SaveSchedulesService;
