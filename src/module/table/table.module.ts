import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TableController } from './table.controller';
import { TableProvider } from './table.provider';
import { TableService } from './table.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TableController],
  providers: [...TableProvider, TableService],
})
export class TableModule {}
