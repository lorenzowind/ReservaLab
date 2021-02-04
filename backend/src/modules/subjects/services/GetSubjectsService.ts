import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/schemas/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class GetSubjectsService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(): Promise<Subject> {
    const data = await this.subjectsRepository.get();

    return data;
  }
}

export default GetSubjectsService;
