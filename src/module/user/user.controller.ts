import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, FindUserByEmailDto } from '../../dto/user.dto';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getUser();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.getUserByEmail(new FindUserByEmailDto(email));
  }

  @Post()
  async createUser(
    @Res() res: Response,
    @Body() user: CreateUserDto,
  ): Promise<void> {
    let users: User | null = null;
    try {
      users = await this.userService.createUser(user);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (users !== null) res.status(HttpStatus.CREATED).send();
  }

  @Delete()
  async deleteUser(
    @Res() res: Response,
    @Body() user: FindUserByEmailDto,
  ): Promise<void> {
    const result = await this.userService.deleteUser(user);
    res.status(result ? HttpStatus.ACCEPTED : HttpStatus.BAD_REQUEST).send();
  }
}
