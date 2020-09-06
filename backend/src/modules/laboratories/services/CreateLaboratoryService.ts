import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import ICreateLaboratoryDTO from '../dtos/ICreateOrUpdateLaboratoryDTO';

import Laboratory from '../infra/typeorm/entities/Laboratory';

@injectable()
class CreateLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({
    name,
    number,
  }: ICreateLaboratoryDTO): Promise<Laboratory> {
    const checkLaboratoryNameExists = await this.laboratoriesRepository.findByName(
      name,
    );

    if (checkLaboratoryNameExists) {
      throw new AppError('Laboratory name already used.');
    }

    const checkLaboratoryNumberExists = await this.laboratoriesRepository.findByNumber(
      number,
    );

    if (checkLaboratoryNumberExists) {
      throw new AppError('Laboratory number already used.');
    }

    const laboratory = await this.laboratoriesRepository.create({
      name,
      number,
    });

    return laboratory;
  }
}

export default CreateLaboratoryService;
