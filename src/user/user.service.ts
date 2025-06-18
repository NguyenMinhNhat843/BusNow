import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserByGoogleDTO } from './dto/createUserByGoogleDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOrcreateUserByGoogle(data: CreateUserByGoogleDTO) {
    let user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      user = this.userRepo.create({
        ...data,
        provider: 'google',
      });
      await this.userRepo.save(user);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email: email });
    return user ? true : false;
  }

  async getUserLimit(start: number, end: number) {
    const total = await this.userRepo.count();
    if (end < start) {
      throw new BadRequestException('Điểm kết thúc phải lớn hơn điểm bắt đầu');
    }
    if (start > total) {
      throw new BadRequestException('Điểm bắt đầu vượt quá tổng số người dùng');
    }

    const take = Math.min(end - start + 1, total - start);
    const skip = start;

    const user = await this.userRepo.find({
      skip,
      take,
    });

    return {
      total,
      start,
      end: start + take - 1,
      users: user,
    };
  }

  async toggleUserActiveStatus(
    email: string,
    status: boolean,
  ): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Nguời dùng không tồn tại');
    }

    if (user.isActive === status) {
      return { message: `tài khoản đã ${status ? 'kích hoạt' : 'vô hiệu'}` };
    }

    user.isActive = status;
    await this.userRepo.save(user);

    return {
      message: `Tài khoản ${status ? 'kích hoạt lại' : 'vô hiệu'} thành công`,
    };
  }
}
