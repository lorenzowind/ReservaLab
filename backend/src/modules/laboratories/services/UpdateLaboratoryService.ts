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

    laboratory.name = name;
    laboratory.number = number;

    return this.laboratoriesRepository.save(laboratory);
  }
}

export default UpdateLaboratoryService;
