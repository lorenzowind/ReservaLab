import { injectable, inject } from 'tsyringe';

import Classroom from '../infra/typeorm/schemas/Classroom';
import IClassroomsRepository from '../repositories/IClassroomsRepository';

@injectable()
class GetClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute(): Promise<Classroom> {
    const data = await this.classroomsRepository.get();

    return data;
  }
}

export default GetClassroomsService;
