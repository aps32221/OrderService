import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { MockFactory } from '../../utilities';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const userArr: User[] = [
    {
      id: 'test1',
      email: 'test1@test.com',
      password: 'test1',
      create_date: new Date(),
      delete_date: new Date(),
      update_date: new Date(),
    },
    {
      id: 'test2',
      email: 'test2@test.com',
      password: 'test2',
      create_date: new Date(),
      delete_date: new Date(),
      update_date: new Date(),
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: MockFactory.getMock(UserService),
        },
      ],
    }).compile();

    userController = moduleRef.get(UserController);
    userService = moduleRef.get(UserService);
  });

  describe('getAllUser', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(userService, 'getUser')
        .mockImplementation(
          async () => await new Promise<User[]>((reso) => reso(userArr)),
        );

      expect(await userController.getAllUser()).toBe(userArr);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userService.getUser).toHaveBeenCalled();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user', async () => {
      jest
        .spyOn(userService, 'getUserByEmail')
        .mockImplementation(
          async () => await new Promise<User>((reso) => reso(userArr[0])),
        );
      expect(await userController.getUserByEmail('test1@test.com')).toBe(
        userArr[0],
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userService.getUserByEmail).toHaveBeenCalledWith({
        email: 'test1@test.com',
      });
    });
  });

  describe('deleteUser', () => {
    it('should res status be correct', async () => {
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementation(
          async () => await new Promise<boolean>((reso) => reso(true)),
        );
      let code = HttpStatus.ACCEPTED;
      const response1: Partial<Response> = {
        json: jest.fn().mockReturnValue({}),
        status: jest.fn().mockImplementation((x: number) => {
          return {
            send: jest.fn().mockImplementation(() => {
              code = x;
            }),
          };
        }),
      };
      await userController.deleteUser(response1 as Response, {
        email: 'test1@test.com',
      });
      expect(code).toBe(HttpStatus.ACCEPTED);
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementation(
          async () => await new Promise<boolean>((reso) => reso(false)),
        );
      await userController.deleteUser(response1 as Response, {
        email: 'test1@test.com',
      });
      expect(code).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('createUser', () => {
    it('should res status be correct', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(
          async () => await new Promise<User>((reso) => reso(userArr[0])),
        );
      let code = HttpStatus.ACCEPTED;
      const response1: Partial<Response> = {
        json: jest.fn().mockReturnValue({}),
        status: jest.fn().mockImplementation((x: number) => {
          return {
            send: jest.fn().mockImplementation(() => {
              code = x;
            }),
          };
        }),
      };
      await userController.createUser(response1 as Response, {
        email: userArr[0].email,
        password: userArr[0].password,
      });
      expect(code).toBe(HttpStatus.CREATED);
      jest.spyOn(userService, 'createUser').mockImplementation(
        async () =>
          await new Promise<User>(() => {
            throw new Error();
          }),
      );
      await userController.createUser(response1 as Response, {
        email: userArr[0].email,
        password: userArr[0].password,
      });
      expect(code).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
