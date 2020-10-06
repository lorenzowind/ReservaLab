export default interface ICreateUserDTO {
  name: string;
  email: string;
  position: 'teacher' | 'admin';
  subjects: string;
  password: string;
}
