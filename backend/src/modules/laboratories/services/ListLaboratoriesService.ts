import { injectable, inject } from 'tsyringe';

import ILaboratoriesRepository from '../repositories/ILaboratoriesRepository';

import Laboratory from '../infra/typeorm/entities/Laboratory';

@injectable()
class ListLaboratoriesService {
  constructor(
    @inject('LaboratoriesRepository')
    private laboratoriesRepository: ILaboratoriesRepository,
  ) {}

  public async execute(search: string, page: number): Promise<Laboratory[]> {
    const laboratories = await this.laboratoriesRepository.findAllLaboratories(
      search,
      page > 0 ? page : 1,
    );

    return laboratories;
  }
}

export default ListLaboratoriesService;
