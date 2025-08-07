import { DataSource } from 'typeorm';
import { Table } from './table.entity';

export const TableProvider = [
  {
    provide: 'TABLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Table),
    inject: ['DATA_SOURCE'],
  },
];
