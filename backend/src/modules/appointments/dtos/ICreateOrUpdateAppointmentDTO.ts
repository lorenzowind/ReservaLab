export default interface ICreateOrUpdateAppointmentDTO {
  teacher_id: string;
  laboratory_id: string;
  year: number;
  month: number;
  day: number;
  time: string;
  subject: string;
  classroom: string;
}
