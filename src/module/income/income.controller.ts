import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Income } from './income.entity';

@Controller()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  async getAllIncome() {
    return await this.incomeService.getIncome();
  }
  @Get('shop/:id')
  async getIncomeByShopId(@Param('id') id: string) {
    return await this.incomeService.getIncomeByShopId(id);
  }
  @Get(':id')
  async getIncomeById(@Param('id') id: string) {
    return await this.incomeService.getIncomeById(id);
  }
  @Get('paid/:orderId')
  async getPaid(@Param('orderId') orderId: string) {
    return await this.incomeService.getPaid(orderId);
  }
  @Post()
  async createIncome(@Body() income: Partial<Income>) {
    return await this.incomeService.createIncome(income);
  }
  @Delete(':id')
  async deleteIncome(
    @Param('id') incomeId: string,
    @Body('shopId') shopId: string,
  ) {
    return await this.incomeService.deleteIncome(incomeId, shopId);
  }
}
