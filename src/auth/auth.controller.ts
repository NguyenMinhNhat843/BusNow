import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Get('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    const otp = this.authService.generrateOtp();
    this.authService.saveOtp(body.email, otp);
    await this.authService.sendOtp(body.email, otp);
    return { message: 'OTP đã được gửi đến email của bạn.' };
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    const isValid = this.authService.verifyOtp(email, otp);
    if (!isValid) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn!');
    }
    return { message: 'Xác thực OTP thành công!' };
  }
}
