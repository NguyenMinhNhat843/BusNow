import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterDTO } from '../auth/dto/RegisterDTO';
import { LoginDTO } from '../auth/dto/LoginDTO';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: Partial<User>) {
    return this.userService.createUser(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
