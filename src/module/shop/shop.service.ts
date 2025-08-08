import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY') private shopRepository: Repository<Shop>,
  ) {}

  async getShop(): Promise<Shop[]> {
    return await this.shopRepository.find();
  }

  async getShopByUserId(userId: string): Promise<Shop[]> {
    const shops = await this.shopRepository.find({
      where: { user: { id: userId } },
      relations: {
        items: true,
        tables: true,
      },
    });
    return shops;
  }

  async getShopById(id: string): Promise<Shop | null> {
    return await this.shopRepository.findOne({
      where: { id: id },
      relations: {
        items: true,
        tables: true,
      },
    });
  }

  async createShop(shop: Partial<Shop>): Promise<Shop> {
    return await this.shopRepository.save(
      this.shopRepository.create({
        ...shop,
        user: shop.user,
      }),
    );
  }
}
