import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Laboratory from '../infra/typeorm/schemas/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

import ISaveLaboratoriesDTO from '../dtos/ISaveLaboratoriesDTO';

@injectable()
class SaveLaboratoriesService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute({
    laboratories,
  }: ISaveLaboratoriesDTO): Promise<Laboratory> {
    const laboratoriesArray = laboratories.split(', ');

    for (let i = 0; i < laboratoriesArray.length; i += 1) {
      const findLaboratory = laboratoriesArray.find(
        (laboratory, index) =>
          laboratory === laboratoriesArray[i] && index !== i,
      );

      if (findLaboratory) {
        throw new AppError('Informed laboratories are not valid.');
      }
    }

    const currentLaboratories = await this.laboratoriesRepository.get();

    if (currentLaboratories) {
      await this.laboratoriesRepository.clear();
    }

    const data = await this.laboratoriesRepository.save({
      laboratories,
    });

    return data;
  }
}

export default SaveLaboratoriesService;
