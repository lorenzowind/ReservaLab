import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SaveSubjectsService from '@modules/subjects/services/SaveSubjectsService';
import GetSubjectsService from '@modules/subjects/services/GetSubjectsService';

export default class SubjectsController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { subjects } = request.body;

    const saveSubjects = container.resolve(SaveSubjectsService);

    const data = await saveSubjects.execute({ subjects });

    return response.json(data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getSubjects = container.resolve(GetSubjectsService);

    const data = await getSubjects.execute();

    return response.json(data);
  }
}
