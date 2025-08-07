import { DataSource } from 'typeorm';
import { Income } from './income.entity';

export const IncomeProvider = [
  {
    provide: 'INCOME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Income),
    inject: ['DATA_SOURCE'],
  },
];
