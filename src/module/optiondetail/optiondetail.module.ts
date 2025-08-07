import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OptionDetailService } from './optiondetail.service';
import { OptionDetailController } from './optiondetail.controller';
import { OptionDetailProvider } from './optiondetail.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionDetailController],
  providers: [...OptionDetailProvider, OptionDetailService],
})
export class OptionDetailModule {}
