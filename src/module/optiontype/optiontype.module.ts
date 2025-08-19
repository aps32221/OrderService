import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OptionTypeController } from './optiontype.controller';
import { OptionTypeProvider } from './optiontype.provider';
import { OptionTypeService } from './optiontype.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionTypeController],
  providers: [...OptionTypeProvider, OptionTypeService],
})
export class OptionTypeModule {}
