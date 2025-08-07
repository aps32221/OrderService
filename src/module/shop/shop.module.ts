import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopProvider } from './shop.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ShopController],
  providers: [...ShopProvider, ShopService],
})
export class ShopModule {}
