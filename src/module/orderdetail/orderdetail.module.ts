import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderDetailController } from './orderdetail.controller';
import { OrderDetailProvider } from './orderdetail.provider';
import { OrderDetailService } from './orderdetail.service';
import { OptionDetailProvider } from '../optiondetail/optiondetail.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderDetailController],
  providers: [
    ...OrderDetailProvider,
    ...OptionDetailProvider,
    OrderDetailService,
  ],
})
export class OrderDetailModule {}
