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
    laboratories_names,
    laboratories_numbers,
  }: ISaveLaboratoriesDTO): Promise<Laboratory> {
    const laboratoriesNamesArray = laboratories_names.split(', ');
    const laboratoriesNumbersArray = laboratories_numbers.split(', ');

    if (laboratoriesNamesArray.length !== laboratoriesNumbersArray.length) {
      throw new AppError('Informed laboratories are not valid.');
    }

    const currentLaboratories = await this.laboratoriesRepository.get();

    if (currentLaboratories) {
      await this.laboratoriesRepository.clear();
    }

    const data = await this.laboratoriesRepository.save({
      laboratories_names,
      laboratories_numbers,
    });

    return data;
  }
}

export default SaveLaboratoriesService;
