import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  isURL,
} from 'class-validator';

export class updateProfileDTO {
  @IsString({ message: 'Email không hợp lệ' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Tên không hợp lệ' })
  @IsOptional()
  lastName?: string;

  //   @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  @IsNumberString()
  @IsOptional()
  phoneNumber?: string;

  @IsString({ message: 'Địa chỉ không hợp lệ' })
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;
}
