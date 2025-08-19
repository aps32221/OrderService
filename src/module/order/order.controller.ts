import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Response } from 'express';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrder(): Promise<Order[]> {
    return await this.orderService.getOrder();
  }

  @Get('shop/:id')
  async getOrderByShopId(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let orders: Order[] | null = null;
    try {
      orders = await this.orderService.getOrderByShopId(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (orders !== null) res.status(HttpStatus.OK).send(orders);
  }

  @Get('shop/:id/details')
  async getOrderByShopIdAndDetails(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let orders: Order[] | null = null;
    try {
      orders = await this.orderService.getOrderByShopIdAndDetails(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (orders !== null) res.status(HttpStatus.OK).send(orders);
  }

  @Get(':id')
  async checkOrder(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let order: Order | null = null;
    try {
      order = await this.orderService.getOrderById(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (order !== null) res.status(HttpStatus.OK).send(order);
  }

  @Patch(':id/:status')
  async changeStatus(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('status') status: string,
  ): Promise<void> {
    let order: Order | null = null;
    try {
      order = await this.orderService.changeStatus(id, status);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (order !== null) res.status(HttpStatus.OK).send(order);
  }

  @Get(':id')
  async getOrderById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let order: Order | null = null;
    try {
      order = await this.orderService.getOrderById(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (order !== null) res.status(HttpStatus.OK).send(order);
  }

  @Post()
  async createOrder(
    @Res() res: Response,
    @Body() order: Partial<Order>,
  ): Promise<void> {
    let newOrder: Order | null = null;
    try {
      newOrder = await this.orderService.createOrder(order);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (newOrder !== null)
      res
        .status(HttpStatus.OK)
        .send(await this.orderService.getOrderByShopId(newOrder.shop.id));
  }

  @Delete(':orderId/:shopId')
  async deleteOrder(
    @Res() res: Response,
    @Param('orderId') orderId: string,
    @Param('shopId') shopId: string,
  ): Promise<void> {
    let order: Order | null = null;
    try {
      order = await this.orderService.deleteOrder(orderId, shopId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (order !== null) res.status(HttpStatus.OK).send(order);
  }
}
