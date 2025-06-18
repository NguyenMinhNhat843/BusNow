import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserByGoogleDTO {
  @IsEmail({}, { message: 'Email không hợp lệ!!!' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
