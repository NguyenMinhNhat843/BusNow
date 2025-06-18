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

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUserLimit')
  async getUserLimit(@Body('start') start: number, @Body('end') end: number) {
    return await this.userService.getUserLimit(start, end);
  }

  @Get('getUserByEmail/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Post('deactiveUser')
  async deactiveUser(
    @Body() body: { email: string; status: boolean },
    @Req() req: any,
  ) {
    if (req.user.role !== 'admin') {
      throw new BadRequestException(
        'Chỉ người dùng có quyền admin mới có thể thực hiện thao tác này',
      );
    }

    return await this.userService.toggleUserActiveStatus(
      body.email,
      body.status,
    );
  }
}
