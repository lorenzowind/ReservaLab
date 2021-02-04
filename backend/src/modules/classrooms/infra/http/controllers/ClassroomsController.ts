import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SaveClassroomsService from '@modules/classrooms/services/SaveClassroomsService';
import GetClassroomsService from '@modules/classrooms/services/GetClassroomsService';

export default class ClassroomsController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { classrooms } = request.body;

    const saveClassrooms = container.resolve(SaveClassroomsService);

    const data = await saveClassrooms.execute({ classrooms });

    return response.json(data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getClassrooms = container.resolve(GetClassroomsService);

    const data = await getClassrooms.execute();

    return response.json(data);
  }
}
