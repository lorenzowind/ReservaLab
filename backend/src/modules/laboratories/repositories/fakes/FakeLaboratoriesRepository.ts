import { ObjectID } from 'mongodb';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import ISaveLaboratoriesDTO from '@modules/laboratories/dtos/ISaveLaboratoriesDTO';

import Laboratory from '../../infra/typeorm/schemas/Laboratory';

export default class FakeLaboratoriesRepository
  implements ILaboratoriesRepository {
  private laboratories: Laboratory[] = [];

  public async get(): Promise<Laboratory> {
    return this.laboratories[0];
  }

  public async save({
    laboratories,
  }: ISaveLaboratoriesDTO): Promise<Laboratory> {
    const data = new Laboratory();

    Object.assign(data, {
      id: new ObjectID(),
      laboratories,
    });

    this.laboratories.push(data);

    return data;
  }

  public async clear(): Promise<void> {
    this.laboratories = [];
  }
}
