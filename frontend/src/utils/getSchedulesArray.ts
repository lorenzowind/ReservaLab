import { SchedulesState } from '../hooks/schedules';

export default function getSchedulesArray(): SchedulesState[] {
  return [
    {
      schedule_name: '1º Tempo',
      schedule_begin: '07:20',
      schedule_end: '08:10',
    },
    {
      schedule_name: '2º Tempo',
      schedule_begin: '08:10',
      schedule_end: '09:00',
    },
    {
      schedule_name: '3º Tempo',
      schedule_begin: '09:10',
      schedule_end: '10:00',
    },
    {
      schedule_name: '4º Tempo',
      schedule_begin: '10:00',
      schedule_end: '10:50',
    },
    {
      schedule_name: '',
      schedule_begin: '10:50',
      schedule_end: '11:40',
    },
    {
      schedule_name: '',
      schedule_begin: '11:40',
      schedule_end: '12:30',
    },
    {
      schedule_name: '5º Tempo',
      schedule_begin: '12:50',
      schedule_end: '13:40',
    },
    {
      schedule_name: '6º Tempo',
      schedule_begin: '13:40',
      schedule_end: '14:30',
    },
    {
      schedule_name: '7º Tempo',
      schedule_begin: '14:50',
      schedule_end: '15:40',
    },
    {
      schedule_name: '8º Tempo',
      schedule_begin: '15:40',
      schedule_end: '16:30',
    },
  ];
}
