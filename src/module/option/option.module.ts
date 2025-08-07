import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OptionController } from './option.controller';
import { OptionProvider } from '../option/option.provider';
import { OptionService } from './option.service';
import { OptionTypeProvider } from '../optiontype/optiontype.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OptionController],
  providers: [...OptionProvider, ...OptionTypeProvider, OptionService],
})
export class OptionModule {}
