import { DataSource } from 'typeorm';
import { OptionType } from './optiontype.entity';

export const OptionTypeProvider = [
  {
    provide: 'OPTION_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OptionType),
    inject: ['DATA_SOURCE'],
  },
];
