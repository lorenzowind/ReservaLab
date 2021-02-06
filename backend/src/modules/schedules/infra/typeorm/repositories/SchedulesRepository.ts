import { getMongoRepository, MongoRepository } from 'typeorm';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

import ISaveSchedulesDTO from '@modules/schedules/dtos/ISaveSchedulesDTO';

import Schedule from '../schemas/Schedule';

class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: MongoRepository<Schedule>;

  constructor() {
    this.ormRepository = getMongoRepository(Schedule, 'mongo');
  }

  public async get(): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find();

    return schedules;
  }

  public async save(data: ISaveSchedulesDTO[]): Promise<Schedule[]> {
    const result = this.ormRepository.create(data);

    await this.ormRepository.save(result);

    return result;
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }
}

export default SchedulesRepository;
