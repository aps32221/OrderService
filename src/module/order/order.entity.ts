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
import { Table } from '../table/table.entity';
import { OrderDetail } from '../orderdetail/orderdetail.entity';
import { Shop } from '../shop/shop.entity';
import { Income } from '../income/income.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(() => Shop, (shop) => shop.orders)
  shop: Shop;

  @ManyToOne(() => Table, (table) => table.orders)
  table: Table;

  @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.order)
  orderDetails: OrderDetail[];

  @OneToMany(() => Income, (income) => income.income, {
    cascade: ['soft-remove'],
  })
  incomes: Income[];

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
