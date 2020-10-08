export default interface ICreateUserDTO {
  ra: string;
  name: string;
  email: string;
  position: 'teacher' | 'admin';
  subjects: string;
  password: string;
}
