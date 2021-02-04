import { ObjectID } from 'mongodb';

import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';

import ISaveSubjectsDTO from '@modules/subjects/dtos/ISaveSubjectsDTO';

import Subject from '../../infra/typeorm/schemas/Subject';

export default class FakeSubjectsRepository implements ISubjectsRepository {
  private subjects: Subject[] = [];

  public async get(): Promise<Subject> {
    return this.subjects[0];
  }

  public async save({ subjects }: ISaveSubjectsDTO): Promise<Subject> {
    const data = new Subject();

    Object.assign(data, {
      id: new ObjectID(),
      subjects,
    });

    this.subjects.push(data);

    return data;
  }

  public async clear(): Promise<void> {
    this.subjects = [];
  }
}
