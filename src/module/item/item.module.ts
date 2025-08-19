import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemController } from './item.controller';
import { ItemProvider } from './item.provider';
import { ItemService } from './item.service';
import { OptionTypeProvider } from '../optiontype/optiontype.provider';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: join(__dirname, '..', '..', '..', 'image'),
    }),
  ],
  controllers: [ItemController],
  providers: [...ItemProvider, ...OptionTypeProvider, ItemService],
})
export class ItemModule {}
