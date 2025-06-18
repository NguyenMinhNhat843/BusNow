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
