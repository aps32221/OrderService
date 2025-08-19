import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  const userArr: User[] = [
    {
      id: 'test1',
      email: 'test1@test.com',
      password: 'test123',
      create_date: new Date(),
      delete_date: new Date(),
      update_date: new Date(),
      shops: [],
    },
    {
      id: 'test2',
      email: 'test2@test.com',
      password: 'test123',
      create_date: new Date(),
      delete_date: new Date(),
      update_date: new Date(),
      shops: [],
    },
  ];
  const mockUserRepo: Partial<Repository<User>> = {
    save: jest.fn(),
    find: jest.fn(() => {
      return new Promise((res) => res(userArr));
    }),
    findOneByOrFail: jest.fn(() => {
      return new Promise((res) => res(userArr[0]));
    }),
    softDelete: jest.fn(() => {
      return new Promise((res) => res({ affected: 1 } as UpdateResult));
    }),
    findOneBy: jest.fn(() => {
      return new Promise((res) => res(userArr[0]));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepo,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should repository.find be executed', async () => {
      await service.getUser();
      expect(mockUserRepo.find).toHaveBeenCalled();
    });
  });

  describe('getUserByEmail', () => {
    it('should repository.findOnByOrFail be executed', async () => {
      await service.getUserByEmail(userArr[0]);
      expect(mockUserRepo.findOneByOrFail).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should repository.save be executed', async () => {
      await service.createUser(userArr[0]);
      expect(mockUserRepo.save).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should repository.softDelete be executed', async () => {
      await service.deleteUser(userArr[0]);
      expect(mockUserRepo.softDelete).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should email and password be checked', async () => {
      const userNoEmail: Partial<User> = {
        password: 'test1',
      };
      const userNoPassword: Partial<User> = {
        email: 'test1@test.com',
      };
      const resultNoEmail = await service.loginUser(userNoEmail as User);
      const resultNoPassword = await service.loginUser(userNoPassword as User);
      expect(resultNoEmail).toBeNull();
      expect(resultNoPassword).toBeNull();
    });
    it('should return user', async () => {
      const user = await service.loginUser(userArr[0]);
      jest.spyOn(mockUserRepo, 'findOneBy').mockResolvedValue({
        ...userArr[0],
        password: bcrypt.hashSync(
          userArr[0].password,
          '$2b$10$zO2E5Tead9YEFow79fodbu',
        ),
      });
      expect(mockUserRepo.findOneBy).toHaveBeenCalled();
      expect(user).toEqual(userArr[0]);
    });
    it('should return null if user not found', async () => {
      jest.spyOn(mockUserRepo, 'findOneBy').mockResolvedValue(null);
      const user = await service.loginUser(userArr[0]);
      expect(user).toBeNull();
    });
  });
});
