import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderDetailService } from './orderdetail.service';
import { OrderDetail } from './orderdetail.entity';

@Controller()
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async getAllOrderDetail() {
    return await this.orderDetailService.getOrderDetail();
  }
  @Get(':id')
  async getOrderDetailById(id: string) {
    return await this.orderDetailService.getOrderDetailById(id);
  }
  @Get('order/:orderId')
  async getOrderDetailByOrderId(@Param('orderId') orderId: string) {
    return await this.orderDetailService.getOrderDetailByOrderId(orderId);
  }
  @Post()
  async createOrderDetail(@Body() orderDetail: Partial<OrderDetail[]>) {
    return await this.orderDetailService.createOrderDetail(orderDetail);
  }
  @Delete(':id')
  async deleteOrderDetail(id: string) {
    return await this.orderDetailService.deleteOrderDetail(id);
  }
}
