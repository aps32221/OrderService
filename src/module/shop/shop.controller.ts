import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from './shop.entity';
import { Response } from 'express';

@Controller()
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async getAllShop(): Promise<Shop[]> {
    return await this.shopService.getShop();
  }

  @Get('/user/:userId')
  async getShopByUserId(
    @Res() res: Response,
    @Param('userId') userId: string,
  ): Promise<void> {
    let shops: Shop[] | null = null;
    try {
      shops = await this.shopService.getShopByUserId(userId);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (shops !== null) res.status(HttpStatus.OK).send(shops);
  }

  @Get(':id')
  async getShopById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let shop: Shop | null = null;
    try {
      shop = await this.shopService.getShopById(id);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (shop !== null) res.status(HttpStatus.OK).send(shop);
  }

  @Post()
  async createShop(
    @Res() res: Response,
    @Body() shop: Partial<Shop>,
  ): Promise<void> {
    let shops: Shop | null = null;
    try {
      shops = await this.shopService.createShop(shop);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (shops !== null) res.status(HttpStatus.CREATED).send();
  }
}
