import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ListTeachersService from '@modules/users/services/ListTeachersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ra, name, email, position, subjects, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      ra,
      name,
      email,
      position,
      subjects,
      password,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      ra,
      name,
      email,
      position,
      subjects,
      old_password,
      new_password,
    } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      ra,
      name,
      email,
      subjects,
      position,
      old_password,
      new_password,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async updateTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const {
      ra,
      name,
      email,
      position,
      subjects,
      old_password,
      new_password,
    } = request.body;

    const updateTeacher = container.resolve(UpdateUserService);

    const user = await updateTeacher.execute({
      id,
      ra,
      name,
      email,
      subjects,
      position,
      old_password,
      new_password,
    });

    return response.json(classToClass(user));
  }

  public async deleteTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteTeacher = container.resolve(DeleteUserService);

    await deleteTeacher.execute(id);

    return response.status(200).send();
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { search = '' } = request.query;

    const listTeachers = container.resolve(ListTeachersService);

    const teachers = await listTeachers.execute({
      user_id,
      search: String(search),
    });

    return response.json(classToClass(teachers));
  }
}
