import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILaboratoriesRepository from '@modules/laboratories/repositories/ILaboratoriesRepository';

import Laboratory from '../infra/typeorm/entities/Laboratory';

import IUpdateLaboratoryDTO from '../dtos/ICreateOrUpdateLaboratoryDTO';

interface IRequest extends IUpdateLaboratoryDTO {
  id: string;
}

@injectable()
class UpdateLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({ id, name, number }: IRequest): Promise<Laboratory> {
    const laboratory = await this.laboratoriesRepository.findById(id);

    if (!laboratory) {
      throw new AppError('Laboratory not found.');
    }

    const laboratoryWithUpdatedName = await this.laboratoriesRepository.findByName(
      name,
    );

    if (laboratoryWithUpdatedName && laboratoryWithUpdatedName.id !== id) {
      throw new AppError('Laboratory name already in use.');
    }

    const laboratoryWithUpdatedNumber = await this.laboratoriesRepository.findByNumber(
      number,
    );

    if (laboratoryWithUpdatedNumber && laboratoryWithUpdatedNumber.id !== id) {
      throw new AppError('Laboratory number already in use.');
    }

    laboratory.name = name;
    laboratory.number = number;

    return this.laboratoriesRepository.save(laboratory);
  }
}

export default UpdateLaboratoryService;
