export default interface ICreateOrUpdateUserDTO {
  name: string;
  email: string;
  position: 'teacher' | 'admin';
  subjects: string;
  password: string;
}
