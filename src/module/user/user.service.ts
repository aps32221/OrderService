import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  CreateUserDto,
  FindUserByEmailDto,
  FindUserByLoginDto,
} from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByEmail(user: FindUserByEmailDto): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ ...user });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const bcyptPass: string = await bcrypt.hash(
      user.password,
      '$2b$10$zO2E5Tead9YEFow79fodbu',
    );
    return await this.userRepository.save({ ...user, password: bcyptPass });
  }

  async deleteUser(user: FindUserByEmailDto): Promise<boolean> {
    const res = await this.userRepository.softDelete({ ...user });
    return res.affected == 1;
  }

  async loginUser(user: FindUserByLoginDto): Promise<User | null> {
    if (!user.email || !user.password) {
      return null;
    }
    const bcyptPass: string = await bcrypt.hash(
      user.password,
      '$2b$10$zO2E5Tead9YEFow79fodbu',
    );
    const foundUser = await this.userRepository.findOneBy({
      ...user,
      password: bcyptPass,
    });
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }
}
