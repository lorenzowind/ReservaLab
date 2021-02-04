import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Classroom from '../infra/typeorm/schemas/Classroom';
import IClassroomsRepository from '../repositories/IClassroomsRepository';

import ISaveClassroomsDTO from '../dtos/ISaveClassroomsDTO';

@injectable()
class SaveClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ classrooms }: ISaveClassroomsDTO): Promise<Classroom> {
    const classroomsArray = classrooms.split(', ');

    for (let i = 0; i < classroomsArray.length; i += 1) {
      const findClassroom = classroomsArray.find(
        (classroom, index) => classroom === classroomsArray[i] && index !== i,
      );

      if (findClassroom) {
        throw new AppError('Informed classrooms are not valid.');
      }
    }
    const currentClassrooms = await this.classroomsRepository.get();

    if (currentClassrooms) {
      await this.classroomsRepository.clear();
    }

    const data = await this.classroomsRepository.save({
      classrooms,
    });

    return data;
  }
}

export default SaveClassroomsService;
