import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLaboratoriesService from '@modules/laboratories/services/ListLaboratoriesService';
import CreateLaboratoryService from '@modules/laboratories/services/CreateLaboratoryService';
import UpdateLaboratoryService from '@modules/laboratories/services/UpdateLaboratoryService';
import DeleteLaboratoryService from '@modules/laboratories/services/DeleteLaboratoryService';

export default class LaboratoriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listLaboratories = container.resolve(ListLaboratoriesService);

    const laboratories = await listLaboratories.execute();

    return response.json(laboratories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, number } = request.body;

    const createLaboratory = container.resolve(CreateLaboratoryService);

    const laboratory = await createLaboratory.execute({ name, number });

    return response.json(laboratory);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, number } = request.body;

    const updateLaboratory = container.resolve(UpdateLaboratoryService);

    const laboratory = await updateLaboratory.execute({
      id,
      name,
      number,
    });

    return response.json(laboratory);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLaboratory = container.resolve(DeleteLaboratoryService);

    await deleteLaboratory.execute(id);

    return response.status(200).send();
  }
}
