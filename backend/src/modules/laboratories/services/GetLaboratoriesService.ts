import { injectable, inject } from 'tsyringe';

import Laboratory from '../infra/typeorm/schemas/Laboratory';
import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

@injectable()
class GetLaboratoriesService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(): Promise<Laboratory> {
    const data = await this.laboratoriesRepository.get();

    return data;
  }
}

export default GetLaboratoriesService;
