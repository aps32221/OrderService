import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...OrderProvider, OrderService],
})
export class OrderModule {}
