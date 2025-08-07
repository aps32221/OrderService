import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { IncomeController } from './income.controller';
import { IncomeProvider } from './income.provider';
import { IncomeService } from './income.service';
import { OrderProvider } from '../order/order.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomeController],
  providers: [...IncomeProvider, ...OrderProvider, IncomeService],
})
export class IncomeModule {}
