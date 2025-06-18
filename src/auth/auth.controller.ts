import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp-register')
  async sendOtpRegister(@Body() body: { email: string }) {
    // check email đã được đăng ký hay chưa
    const isExistsUser = await this.authService.findUserByEmail(body.email);
    if (isExistsUser) {
      throw new BadRequestException('Email đã được đăng ký!!!');
    }

    const otp = this.authService.generrateOtp();
    this.authService.saveOtp(body.email, otp);
    await this.authService.sendOtp(body.email, otp);
    return {
      message:
        'Vui lòng kiểm tra email và xác thực otp để hoàn thành đăng ký!!!',
    };
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const isValid = this.authService.verifyOtp(body.email, body.otp);
    if (!isValid) {
      throw new BadRequestException('Mã OTP không hợp lệ hoặc đã hết hạn!');
    }
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

  @Post('send-reset-password-link')
  async sendReserPasswordLink(@Body() body: { email: string }) {
    const { email } = body;

    await this.authService.sendResetPasswordLink(email);
    return {
      message:
        'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra email để tiếp tục.',
    };
  }

  // AuthController
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req) {
    return {
      message: 'Đăng nhập thành công với Google!',
      user: req.user, // user được gắn vào request bởi GoogleStrategy
    };
  }
}
