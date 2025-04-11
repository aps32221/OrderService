import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, FindUserByEmailDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByEmail(user: FindUserByEmailDto): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ ...user });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ ...user });
  }

  async deleteUser(user: FindUserByEmailDto): Promise<boolean> {
    const res = await this.userRepository.softDelete({ ...user });
    return res.affected == 1;
  }
}
