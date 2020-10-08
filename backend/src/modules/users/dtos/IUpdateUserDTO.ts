export default interface IUpdateUserDTO {
  ra: string;
  name: string;
  email: string;
  subjects: string;
  position: 'teacher' | 'admin';
  old_password: string;
  new_password: string;
}
