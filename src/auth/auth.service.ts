import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // find User by email
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      return null;
    }
    return user;
  }

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

  // ====================== mail service ======================
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ADMIN_USERNAME,
      pass: process.env.GMAIL_ADMIN_PASSWORD,
    },
  });

  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  generrateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(toEmail: string, otp: string) {
    const mailContent = {
      from: process.env.GMAIL_ADMIN_USERNAME,
      to: toEmail,
      subject: 'Mã OTP xác thực gmail',
      html: `<h1>Max OTP của bạn là: <b>${otp}</b></h1>`,
    };

    await this.transporter.sendMail(mailContent);
  }

  saveOtp(toEmail: string, otp: string) {
    this.otpStore.set(toEmail, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP hợp lệ trong 5 phút
    });
  }

  verifyOtp(toEmail: string, otp: string): boolean {
    const record = this.otpStore.get(toEmail);
    if (!record) {
      throw new BadRequestException('Mã OTP không hợp lệ hoặc đã hết hạn');
    }

    const isValid = record.otp === otp && record.expiresAt > Date.now();
    if (isValid) {
      this.otpStore.delete(toEmail); // Xóa OTP sau khi xác thực thành công
    }
    return isValid;
  }
}
