import { DataSource } from 'typeorm';
import { Shop } from './shop.entity';

export const ShopProvider = [
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
    inject: ['DATA_SOURCE'],
  },
];
