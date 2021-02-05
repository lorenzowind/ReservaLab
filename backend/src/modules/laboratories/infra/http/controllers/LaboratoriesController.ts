import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SaveLaboratoriesService from '@modules/laboratories/services/SaveLaboratoriesService';
import GetLaboratoriesService from '@modules/laboratories/services/GetLaboratoriesService';

export default class LaboratoriesController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { laboratories_names, laboratories_numbers } = request.body;

    const saveLaboratories = container.resolve(SaveLaboratoriesService);

    const data = await saveLaboratories.execute({
      laboratories_names,
      laboratories_numbers,
    });

    return response.json(data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getLaboratories = container.resolve(GetLaboratoriesService);

    const data = await getLaboratories.execute();

    return response.json(data);
  }
}
