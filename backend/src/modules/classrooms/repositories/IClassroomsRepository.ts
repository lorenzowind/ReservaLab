import ISaveClassroomsDTO from '../dtos/ISaveClassroomsDTO';

import Classroom from '../infra/typeorm/schemas/Classroom';

export default interface IClassroomsRepository {
  get(): Promise<Classroom>;
  save(data: ISaveClassroomsDTO): Promise<Classroom>;
  clear(): Promise<void>;
}
