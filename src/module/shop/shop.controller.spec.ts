/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { MockFactory } from '../../utilities';
import { Response } from 'express';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { HttpStatus } from '@nestjs/common';

describe('ShopController', () => {
  let shopController: ShopController;
  let shopService: ShopService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [
        {
          provide: ShopService,
          useValue: MockFactory.getMock(ShopService),
        },
      ],
    }).compile();

    shopController = moduleRef.get(ShopController);
    shopService = moduleRef.get(ShopService);
  });

  describe('getAllShop', () => {
    it('should return an array of shops', async () => {
      const mockShops = [new Shop(), new Shop()];
      jest.spyOn(shopService, 'getShop').mockResolvedValue(mockShops);

      const response = await shopController.getAllShop();

      expect(response).toEqual(mockShops);
      expect(shopService.getShop).toHaveBeenCalled();
    });
  });

  describe('getShopByUserId', () => {
    it('should return an array of shops for a user', async () => {
      const userId = '1';
      const mockShops = [new Shop(), new Shop()];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(shopService, 'getShopByUserId').mockResolvedValue(mockShops);

      await shopController.getShopByUserId(res as Response, userId);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(mockShops);
      expect(shopService.getShopByUserId).toHaveBeenCalledWith(userId);
    });

    it('should handle errors and return BAD_REQUEST', async () => {
      const userId = '1';
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(shopService, 'getShopByUserId').mockRejectedValue(new Error());

      await shopController.getShopByUserId(res as Response, userId);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.send).toHaveBeenCalled();
      expect(shopService.getShopByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('getShopById', () => {
    it('should return a shop by id', async () => {
      const shopId = '1';
      const mockShop = new Shop();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(shopService, 'getShopById').mockResolvedValue(mockShop);

      await shopController.getShopById(res as Response, shopId);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(mockShop);
      expect(shopService.getShopById).toHaveBeenCalledWith(shopId);
    });

    it('should handle errors and return BAD_REQUEST', async () => {
      const shopId = '1';
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(shopService, 'getShopById').mockRejectedValue(new Error());

      await shopController.getShopById(res as Response, shopId);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.send).toHaveBeenCalled();
      expect(shopService.getShopById).toHaveBeenCalledWith(shopId);
    });
  });

  describe('createShop', () => {
    it('should create a new shop', async () => {
      const mockShop = new Shop();
      jest.spyOn(shopService, 'createShop').mockResolvedValue(mockShop);

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await shopController.createShop(res as Response, mockShop);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalled();
      expect(shopService.createShop).toHaveBeenCalledWith(mockShop);
    });

    it('should handle errors and return BAD_REQUEST', async () => {
      const mockShop = new Shop();
      jest.spyOn(shopService, 'createShop').mockRejectedValue(new Error());

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await shopController.createShop(res as Response, mockShop);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.send).toHaveBeenCalled();
      expect(shopService.createShop).toHaveBeenCalledWith(mockShop);
    });
  });
});
