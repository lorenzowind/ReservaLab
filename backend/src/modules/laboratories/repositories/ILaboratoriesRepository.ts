import ISaveLaboratoriesDTO from '../dtos/ISaveLaboratoriesDTO';

import Laboratory from '../infra/typeorm/schemas/Laboratory';

export default interface ILaboratoriesRepository {
  get(): Promise<Laboratory>;
  save(data: ISaveLaboratoriesDTO): Promise<Laboratory>;
  clear(): Promise<void>;
}
