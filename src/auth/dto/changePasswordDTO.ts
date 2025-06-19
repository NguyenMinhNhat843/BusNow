import { IsNotEmpty, Matches } from 'class-validator';

export class changePasswordDTO {
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
    message:
      'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự',
  })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  newPassword: string;
}
