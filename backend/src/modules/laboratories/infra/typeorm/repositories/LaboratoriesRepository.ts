import { getMongoRepository, MongoRepository } from 'typeorm';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import ISaveLaboratoriesDTO from '@modules/laboratories/dtos/ISaveLaboratoriesDTO';

import Laboratory from '../schemas/Laboratory';

class LaboratoriesRepository implements ILaboratoriesRepository {
  private ormRepository: MongoRepository<Laboratory>;

  constructor() {
    this.ormRepository = getMongoRepository(Laboratory, 'mongo');
  }

  public async get(): Promise<Laboratory> {
    return (await this.ormRepository.find())[0];
  }

  public async save({
    laboratories,
  }: ISaveLaboratoriesDTO): Promise<Laboratory> {
    const data = this.ormRepository.create({ laboratories });

    await this.ormRepository.save(data);

    return data;
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }
}

export default LaboratoriesRepository;
