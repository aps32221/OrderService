import { Inject, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY') private orderRepository: Repository<Order>,
  ) {}

  async getOrder(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: id, status: Not(OrderStatus.PAID) },
      relations: [
        'orderDetails',
        'orderDetails.item',
        'orderDetails.optionDetails',
        'orderDetails.optionDetails.option',
      ],
    });
    if (order === null) return null;
    return order;
  }

  async getOrderByShopId(id: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { shop: { id: id }, status: Not(OrderStatus.PAID) },
      relations: ['shop', 'table'],
    });
    return orders;
  }

  async getOrderByShopIdAndDetails(id: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { shop: { id: id }, status: Not(OrderStatus.PAID) },
      relations: [
        'shop',
        'table',
        'orderDetails',
        'orderDetails.item',
        'orderDetails.optionDetails',
        'orderDetails.optionDetails.option',
      ],
      order: { create_date: 'ASC' },
    });
    return orders;
  }

  async changeStatus(orderId: string, status: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (order === null) return null;
    order.status = OrderStatus[status as keyof typeof OrderStatus];
    return await this.orderRepository.save(order);
  }

  async createOrder(order: Partial<Order>): Promise<Order> {
    return await this.orderRepository.save(
      this.orderRepository.create({
        ...order,
      }),
    );
  }

  async deleteOrder(orderId: string, shopId: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      withDeleted: true,
    });
    if (order === null) return null;
    return await this.orderRepository.remove(order);
  }
}
