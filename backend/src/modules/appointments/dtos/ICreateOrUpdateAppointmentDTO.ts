export default interface ICreateOrUpdateAppointmentDTO {
  teacher_id: string;
  laboratory_number: number;
  year: number;
  month: number;
  day: number;
  time: string;
  subject: string;
  classroom: string;
  status: 'scheduled' | 'presence' | 'absence' | 'non-scheduled';
}
