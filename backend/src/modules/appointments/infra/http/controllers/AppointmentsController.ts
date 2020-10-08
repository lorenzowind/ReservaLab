import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import UpdateAppointmentService from '@modules/appointments/services/UpdateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import DeleteAllAppointmentsService from '@modules/appointments/services/DeleteAllAppointmentsService';

export default class AppointmentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.query;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute(
      Number(year),
      Number(month),
      Number(day),
    );

    return response.json(classToClass(appointments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const teacher_id = request.query.teacher_id
      ? String(request.query.teacher_id)
      : request.user.id;

    const {
      laboratory_number,
      year,
      month,
      day,
      time,
      subject,
      classroom,
      status,
    } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      teacher_id,
      laboratory_number,
      year,
      month,
      day,
      time,
      subject,
      classroom,
      status,
    });

    return response.json(appointment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      teacher_id,
      laboratory_number,
      year,
      month,
      day,
      time,
      subject,
      classroom,
      status,
    } = request.body;

    const updateAppointment = container.resolve(UpdateAppointmentService);

    const appointment = await updateAppointment.execute({
      id,
      teacher_id,
      laboratory_number,
      year,
      month,
      day,
      time,
      subject,
      classroom,
      status,
    });

    return response.json(appointment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAppointment = container.resolve(DeleteAppointmentService);

    await deleteAppointment.execute(id);

    return response.status(200).send();
  }

  public async clean(request: Request, response: Response): Promise<Response> {
    const { operation } = request.params;

    const deleteAppointments = container.resolve(DeleteAllAppointmentsService);

    await deleteAppointments.execute(String(operation));

    return response.status(200).send();
  }
}
