export default interface IUpdateAppointmentStatusDTO {
  status: 'scheduled' | 'presence' | 'absence' | 'non-scheduled';
}
