import { join } from 'path';
import { DataSource } from 'typeorm';

export const DatabaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin32221',
        database: 'orderservice',
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
