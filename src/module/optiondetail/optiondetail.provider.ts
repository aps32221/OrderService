import { DataSource } from 'typeorm';
import { OptionDetail } from './optiondetail.entity';

export const OptionDetailProvider = [
  {
    provide: 'OPTION_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OptionDetail),
    inject: ['DATA_SOURCE'],
  },
];
