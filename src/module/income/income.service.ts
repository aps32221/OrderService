import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Income } from './income.entity';
import { Order, OrderStatus } from '../order/order.entity';

@Injectable()
export class IncomeService {
  constructor(
    @Inject('INCOME_REPOSITORY') private incomeRepository: Repository<Income>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}
  async getIncome(): Promise<Income[]> {
    return await this.incomeRepository.find();
  }
  async getIncomeById(id: string): Promise<Income | null> {
    const income = await this.incomeRepository.findOne({
      where: { id: id },
    });
    if (income === null) return null;
    return income;
  }
  async getIncomeByShopId(id: string): Promise<Income[]> {
    const incomes = await this.incomeRepository.find({
      where: { shop: { id: id } },
      relations: ['shop', 'order'],
    });
    return incomes;
  }

  async getPaid(orderId: string): Promise<Income[]> {
    const incomes = await this.incomeRepository.find({
      where: { order: { id: orderId } },
    });
    return incomes;
  }

  async createIncome(income: Partial<Income>): Promise<Income> {
    const incomeEntity = this.incomeRepository.create({
      ...income,
    });
    const sum = await this.incomeRepository.sum('income', {
      order: { id: incomeEntity.order.id },
    });
    if ((sum || 0) + incomeEntity.income >= incomeEntity.final_price) {
      await this.orderRepository.update(incomeEntity.order.id, {
        status: OrderStatus.PAID,
      });
    }
    return await this.incomeRepository.save(incomeEntity);
  }
  async deleteIncome(incomeId: string, shopId: string): Promise<Income | null> {
    const income = await this.incomeRepository.findOne({
      where: { id: incomeId },
      withDeleted: true,
    });
    if (income === null) return null;
    return await this.incomeRepository.remove(income);
  }
}
