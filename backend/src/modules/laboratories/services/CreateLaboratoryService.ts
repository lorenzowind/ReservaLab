import { injectable, inject } from 'tsyringe';

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
    const laboratory = await this.laboratoriesRepository.create({
      name,
      number,
    });

    return laboratory;
  }
}

export default CreateLaboratoryService;
