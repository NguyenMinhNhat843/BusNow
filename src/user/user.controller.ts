import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { updateProfileDTO } from './dto/updateProfileDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
  ) {}

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

  @Put('updateProfile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Body() body: updateProfileDTO,
    @Req() req: any,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const email = req.user.email as string;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    // Nếu có avatar, xử lý lưu trữ hoặc cập nhật avatar
    let avatarUrl: string | undefined;
    if (avatar) {
      avatarUrl = await this.s3Service.uploadFile(avatar, 'user');
    }

    return await this.userService.updateProfile(body, email, avatarUrl);
  }
}
