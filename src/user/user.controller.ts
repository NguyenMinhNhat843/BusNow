import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterDTO } from './dto/RegisterDTO';
import { LoginDTO } from './dto/LoginDTO';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  register(@Body() body: RegisterDTO) {
    return this.userService.register(body);
  }

  @Get('auth/login')
  login(@Body() data: LoginDTO) {
    return this.userService.login(data);
  }

  @Post()
  create(@Body() body: Partial<User>) {
    return this.userService.createUser(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
