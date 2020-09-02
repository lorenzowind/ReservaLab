export default interface ICreateOrUpdateUserDTO {
  name: string;
  email: string;
  position: 'teacher' | 'admin';
  subject: string;
  password: string;
}
