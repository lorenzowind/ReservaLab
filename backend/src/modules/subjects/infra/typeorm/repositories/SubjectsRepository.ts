import { getMongoRepository, MongoRepository } from 'typeorm';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';

import ISaveSubjectsDTO from '@modules/subjects/dtos/ISaveSubjectsDTO';

import Subject from '../schemas/Subject';

class SubjectsRepository implements ISubjectsRepository {
  private ormRepository: MongoRepository<Subject>;

  constructor() {
    this.ormRepository = getMongoRepository(Subject, 'mongo');
  }

  public async get(): Promise<Subject> {
    return (await this.ormRepository.find())[0];
  }

  public async save({ subjects }: ISaveSubjectsDTO): Promise<Subject> {
    const data = this.ormRepository.create({ subjects });

    await this.ormRepository.save(data);

    return data;
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }
}

export default SubjectsRepository;
