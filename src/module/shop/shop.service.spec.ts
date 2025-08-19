import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';

describe('ShopService', () => {
  let service: ShopService;

  const mockShopRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn().mockImplementation((shop: Partial<Shop>) => shop as Shop),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'SHOP_REPOSITORY',
          useValue: mockShopRepo,
        },
        ShopService,
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  describe('getShop', () => {
    it('should repository.find be executed', async () => {
      await service.getShop();
      expect(mockShopRepo.find).toHaveBeenCalled();
    });
  });

  describe('getShopByUserId', () => {
    it('should repository.find be executed with the correct user id', async () => {
      const userId = '1';
      await service.getShopByUserId(userId);
      expect(mockShopRepo.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: {
          items: true,
          tables: true,
        },
      });
    });
  });

  describe('getShopById', () => {
    it('should repository.findOne be executed with the correct id', async () => {
      const shopId = '1';
      await service.getShopById(shopId);
      expect(mockShopRepo.findOne).toHaveBeenCalledWith({
        where: { id: shopId },
        relations: {
          items: true,
          tables: true,
        },
      });
    });
  });

  describe('createShop', () => {
    it('should repository.save be executed with the correct shop', async () => {
      const shop = new Shop();
      await service.createShop(shop);
      expect(mockShopRepo.save).toHaveBeenCalledWith(shop);
      expect(mockShopRepo.create).toHaveBeenCalledWith(shop);
    });
  });
});
