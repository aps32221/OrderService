import { DataSource } from 'typeorm';
import { Item } from './item.entity';

export const ItemProvider = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATA_SOURCE'],
  },
];
