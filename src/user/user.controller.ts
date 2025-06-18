import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new RolesGuard(['admin']))
  @Get('getUserLimit')
  async getUserLimit(@Body('start') start: number, @Body('end') end: number) {
    return await this.userService.getUserLimit(start, end);
  }

  @UseGuards(new RolesGuard(['admin']))
  @Get('getUserByEmail/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @UseGuards(new RolesGuard(['admin']))
  @Post('deactiveUser')
  async deactiveUser(@Body() body: { email: string; status: boolean }) {
    return await this.userService.toggleUserActiveStatus(
      body.email,
      body.status,
    );
  }

  @Get('getProfileMe')
  async getProfile(@Req() req: any) {
    const user = await this.userService.findUserByEmail(
      req.user.email as string,
    );
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return user;
  }
}
