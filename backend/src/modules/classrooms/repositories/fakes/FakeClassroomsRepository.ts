import { ObjectID } from 'mongodb';

import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

import ISaveClassroomsDTO from '@modules/classrooms/dtos/ISaveClassroomsDTO';

import Classroom from '../../infra/typeorm/schemas/Classroom';

export default class FakeClassroomsRepository implements IClassroomsRepository {
  private classrooms: Classroom[] = [];

  public async get(): Promise<Classroom> {
    return this.classrooms[0];
  }

  public async save({ classrooms }: ISaveClassroomsDTO): Promise<Classroom> {
    const data = new Classroom();

    Object.assign(data, {
      id: new ObjectID(),
      classrooms,
    });

    this.classrooms.push(data);

    return data;
  }

  public async clear(): Promise<void> {
    this.classrooms = [];
  }
}
