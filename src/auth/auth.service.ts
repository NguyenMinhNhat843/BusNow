import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/LoginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // register
  async register(data: RegisterDTO) {
    const existsUser = await this.userRepo.findOneBy({ email: data.email });
    if (existsUser) {
      throw new BadRequestException('Email đã được đăng ký!!!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  // login
  async login(data: LoginDTO) {
    const existsUser = await this.userRepo.findOneBy({ email: data.email });
    if (!existsUser) {
      throw new BadRequestException('Email chưa được đăng ký!!!');
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      existsUser.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Thông tin đăng nhập không chính xác!!!');
    }

    const payload = {
      id: existsUser.id,
      email: existsUser.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      existsUser,
    };
  }

  // mail service
}
