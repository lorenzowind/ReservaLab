export default interface ICreateNotificationDTO {
  type: 'schedules' | 'support' | 'programs';
  description: string;
  sender_user_id: string;
  recipient_user_id: string;
}
