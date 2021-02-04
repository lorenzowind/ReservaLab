import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Subject from '../infra/typeorm/schemas/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

import ISaveSubjectsDTO from '../dtos/ISaveSubjectsDTO';

@injectable()
class SaveSubjectsService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute({ subjects }: ISaveSubjectsDTO): Promise<Subject> {
    const subjectsArray = subjects.split(', ');

    for (let i = 0; i < subjectsArray.length; i += 1) {
      const foundSubject = subjectsArray.find(
        (subject, index) => subject === subjectsArray[i] && index !== i,
      );

      if (foundSubject) {
        throw new AppError('Informed subjects are not valid.');
      }
    }

    const currentSubjects = await this.subjectsRepository.get();

    if (currentSubjects) {
      await this.subjectsRepository.clear();
    }

    const data = await this.subjectsRepository.save({
      subjects,
    });

    return data;
  }
}

export default SaveSubjectsService;
