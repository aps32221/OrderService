import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  original_price: number;

  @Column()
  final_price: number;

  @Column()
  income: number;

  @ManyToOne(() => Shop, (shop) => shop.incomes)
  shop: Shop;

  @ManyToOne(() => Order, (order) => order.incomes)
  order: Order;

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
