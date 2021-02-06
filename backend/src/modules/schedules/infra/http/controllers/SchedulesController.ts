import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SaveSchedulesService from '@modules/schedules/services/SaveSchedulesService';
import GetSchedulesService from '@modules/schedules/services/GetSchedulesService';

export default class SchedulesController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const saveSchedules = container.resolve(SaveSchedulesService);

    const result = await saveSchedules.execute(data);

    return response.json(result);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const getSchedules = container.resolve(GetSchedulesService);

    const data = await getSchedules.execute();

    return response.json(data);
  }
}
