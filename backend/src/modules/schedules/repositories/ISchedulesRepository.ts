import ISaveSchedulesDTO from '../dtos/ISaveSchedulesDTO';

import Schedule from '../infra/typeorm/schemas/Schedule';

export default interface ISchedulesRepository {
  get(): Promise<Schedule[]>;
  save(data: ISaveSchedulesDTO[]): Promise<Schedule[]>;
  clear(): Promise<void>;
}
