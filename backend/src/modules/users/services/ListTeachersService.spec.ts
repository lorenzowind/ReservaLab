import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import ListTeachersService from './ListTeachersService';

let draftUsersRepository: DraftUsersRepository;

let listTeachers: ListTeachersService;

describe('ListTeachers', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    listTeachers = new ListTeachersService(draftUsersRepository);
  });

  it('should be able to list the teachers', async () => {
    const createdUser = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: '',
      position: 'admin',
      password: '123456',
    });

    await draftUsersRepository.create({
      ra: '222222',
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    await draftUsersRepository.create({
      ra: '333333',
      name: 'John Doe III',
      email: 'johndoeIII@example.com',
      subjects: 'subject 1',
      position: 'teacher',
      password: '123456',
    });

    const users = await listTeachers.execute({
      user_id: createdUser.id,
      search: '',
    });

    expect(users).toHaveLength(2);
  });

  it('should be able to validate in case of no teachers', async () => {
    const createdUser = await draftUsersRepository.create({
      ra: '111111',
      name: 'John Doe',
      email: 'johndoe@example.com',
      subjects: '',
      position: 'admin',
      password: '123456',
    });

    const users = await listTeachers.execute({
      user_id: createdUser.id,
      search: '',
    });

    expect(users).toHaveLength(0);
  });

  it('should not be able to list the teachers from non existing user', async () => {
    expect(
      listTeachers.execute({
        user_id: 'non existing user',
        search: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
