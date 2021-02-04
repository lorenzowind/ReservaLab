import ISaveSubjectsDTO from '../dtos/ISaveSubjectsDTO';

import Subject from '../infra/typeorm/schemas/Subject';

export default interface ISubjectsRepository {
  get(): Promise<Subject>;
  save(data: ISaveSubjectsDTO): Promise<Subject>;
  clear(): Promise<void>;
}
