import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import ICreateLaboratoryDTO from '@modules/laboratories/dtos/ICreateOrUpdateLaboratoryDTO';

import Laboratory from '../entities/Laboratory';

class LaboratoriesRepository implements ILaboratoriesRepository {
  private ormRepository: Repository<Laboratory>;

  constructor() {
    this.ormRepository = getRepository(Laboratory);
  }

  public async findAllLaboratories(
    search: string,
    page: number,
  ): Promise<Laboratory[]> {
    const laboratories =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return laboratories;
  }

  public async findById(id: string): Promise<Laboratory | undefined> {
    const findLaboratory = await this.ormRepository.findOne(id);

    return findLaboratory;
  }

  public async findByName(name: string): Promise<Laboratory | undefined> {
    const findLaboratory = await this.ormRepository.findOne({
      where: { name },
    });

    return findLaboratory;
  }

  public async findByNumber(number: number): Promise<Laboratory | undefined> {
    const findLaboratory = await this.ormRepository.findOne({
      where: { number },
    });

    return findLaboratory;
  }

  public async create(
    laboratoryData: ICreateLaboratoryDTO,
  ): Promise<Laboratory> {
    const laboratory = this.ormRepository.create(laboratoryData);

    Object.assign(laboratory, { id: v4() });

    await this.ormRepository.save(laboratory);

    return laboratory;
  }

  public async save(laboratory: Laboratory): Promise<Laboratory> {
    return this.ormRepository.save(laboratory);
  }

  public async remove(laboratory: Laboratory): Promise<void> {
    await this.ormRepository.remove(laboratory);
  }
}

export default LaboratoriesRepository;
