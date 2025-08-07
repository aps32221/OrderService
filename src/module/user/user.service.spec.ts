import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  const userArr: User[] = [
    {
      id: 'test1',
      email: 'test1@test.com',
      password: 'test1',
      create_date: new Date(),
      delete_date: new Date(),
      update_date: new Date(),
      shops: [],
    },
    {
      id: 'test2',
      email: 'test2@test.com',
      password: 'test2',
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
});
