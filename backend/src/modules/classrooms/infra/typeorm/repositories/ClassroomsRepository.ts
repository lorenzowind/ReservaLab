import { getMongoRepository, MongoRepository } from 'typeorm';

import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

import ISaveClassroomsDTO from '@modules/classrooms/dtos/ISaveClassroomsDTO';

import Classroom from '../schemas/Classroom';

class ClassroomsRepository implements IClassroomsRepository {
  private ormRepository: MongoRepository<Classroom>;

  constructor() {
    this.ormRepository = getMongoRepository(Classroom, 'mongo');
  }

  public async get(): Promise<Classroom> {
    return (await this.ormRepository.find())[0];
  }

  public async save({ classrooms }: ISaveClassroomsDTO): Promise<Classroom> {
    const data = this.ormRepository.create({ classrooms });

    await this.ormRepository.save(data);

    return data;
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }
}

export default ClassroomsRepository;
