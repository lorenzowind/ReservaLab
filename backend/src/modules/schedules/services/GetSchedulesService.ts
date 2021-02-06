import { injectable, inject } from 'tsyringe';

import Schedule from '../infra/typeorm/schemas/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

@injectable()
class GetSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(): Promise<Schedule[]> {
    const data = await this.schedulesRepository.get();

    return data;
  }
}

export default GetSchedulesService;
