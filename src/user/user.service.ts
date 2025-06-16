import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/RegisterDTO';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const userExists = await this.userRepo.findOneBy({ email: data.email });
    if (userExists) {
      throw new BadRequestException('Email đã được đăng ký!!!');
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async login(data: LoginDTO) {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new Error('Email chưa đưuọc đăng ký!!!');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Thông tin đăng nhập không chính xác!!!');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  createUser(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
