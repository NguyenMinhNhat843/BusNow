import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
