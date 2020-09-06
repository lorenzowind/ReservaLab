import { v4 } from 'uuid';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import ICreateLaboratoryDTO from '@modules/laboratories/dtos/ICreateOrUpdateLaboratoryDTO';

import Laboratory from '@modules/laboratories/infra/typeorm/entities/Laboratory';

export default class DraftLaboratoriesRepository
  implements ILaboratoriesRepository {
  private laboratories: Laboratory[] = [];

  public async findAllLaboratories(
    search: string,
    page: number,
  ): Promise<Laboratory[]> {
    const laboratories = search
      ? this.laboratories.filter(findLaboratory =>
          findLaboratory.name.includes(search),
        )
      : this.laboratories;

    return laboratories.slice((page - 1) * 10, page * 10);
  }

  public async findById(id: string): Promise<Laboratory | undefined> {
    const laboratory = this.laboratories.find(
      findLaboratory => findLaboratory.id === id,
    );

    return laboratory;
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    const laboratory = this.laboratories.find(
      findLaboratory => findLaboratory.name === name,
    );

    return laboratory;
  }

  public async create(
    laboratoryData: ICreateLaboratoryDTO,
  ): Promise<Laboratory> {
    const laboratory = new Laboratory();

    Object.assign(laboratory, { id: v4() }, laboratoryData);

    this.laboratories.push(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    const findIndex = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories[findIndex] = laboratory;

    return laboratory;
  }

  public async remove(laboratory: Laboratory): Promise<void> {
    const findIndex = this.laboratories.findIndex(
      findLaboratory => findLaboratory.id === laboratory.id,
    );

    this.laboratories.splice(findIndex, 1);
  }
}
