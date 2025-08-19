import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './module/user/user.module';
import { ShopModule } from './module/shop/shop.module';
import { ItemModule } from './module/item/item.module';
import { OptionTypeModule } from './module/optiontype/optiontype.module';
import { OptionModule } from './module/option/option.module';
import { TableModule } from './module/table/table.module';
import { OrderModule } from './module/order/order.module';
import { OrderDetailModule } from './module/orderdetail/orderdetail.module';
import { OptionDetailModule } from './module/optiondetail/optiondetail.module';
import { IncomeModule } from './module/income/income.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    UserModule,
    ShopModule,
    ItemModule,
    OptionTypeModule,
    OptionModule,
    TableModule,
    OrderModule,
    OrderDetailModule,
    OptionDetailModule,
    IncomeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'image'),
      serveRoot: '/image/',
    }),
    RouterModule.register([
      {
        path: 'v1',
        module: AppModule,
        children: [
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'shop',
            module: ShopModule,
          },
          {
            path: 'item',
            module: ItemModule,
          },
          {
            path: 'optiontype',
            module: OptionTypeModule,
          },
          {
            path: 'option',
            module: OptionModule,
          },
          {
            path: 'table',
            module: TableModule,
          },
          {
            path: 'order',
            module: OrderModule,
          },
          {
            path: 'orderdetail',
            module: OrderDetailModule,
          },
          {
            path: 'optiondetail',
            module: OptionDetailModule,
          },
          {
            path: 'income',
            module: IncomeModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
