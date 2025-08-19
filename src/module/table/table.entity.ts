import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ nullable: true })
  x: number;

  @Column({ nullable: true })
  y: number;

  @Column()
  seat: number;

  @ManyToOne(() => Shop, (shop) => shop.tables)
  shop: Shop;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
