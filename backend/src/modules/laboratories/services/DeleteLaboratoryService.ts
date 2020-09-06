import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

@injectable()
class DeleteLaboratoryService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const laboratory = await this.laboratoriesRepository.findById(id);

    if (!laboratory) {
      throw new AppError('Laboratory not found.');
    }

    await this.laboratoriesRepository.remove(laboratory);
  }
}

export default DeleteLaboratoryService;
