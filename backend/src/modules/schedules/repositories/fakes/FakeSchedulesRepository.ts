import { ObjectID } from 'mongodb';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

import ISaveSchedulesDTO from '@modules/schedules/dtos/ISaveSchedulesDTO';

import Schedule from '../../infra/typeorm/schemas/Schedule';

export default class FakeSchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async get(): Promise<Schedule[]> {
    return this.schedules;
  }

  public async save(data: ISaveSchedulesDTO[]): Promise<Schedule[]> {
    const result: Schedule[] = [];

    for (let i = 0; i < data.length; i += 1) {
      result.push(new Schedule());

      Object.assign(result[result.length - 1], {
        id: new ObjectID(),
        schedule_name: data[i].schedule_name,
        schedule_begin: data[i].schedule_begin,
        schedule_end: data[i].schedule_end,
      });

      this.schedules.push(result[result.length - 1]);
    }

    return result;
  }

  public async clear(): Promise<void> {
    this.schedules = [];
  }
}
