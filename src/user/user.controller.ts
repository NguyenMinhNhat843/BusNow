import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUserLimit')
  async getUserLimit(@Body('start') start: number, @Body('end') end: number) {
    return await this.userService.getUserLimit(start, end);
  }
}
