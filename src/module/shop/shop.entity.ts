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
import { Item } from '../item/item.entity';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';
import { Income } from '../income/income.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 100 })
  description: string;

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @OneToMany(() => Table, (table) => table.shop)
  tables: Table[];

  @OneToMany(() => Item, (item) => item.shop)
  items: Item[];

  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[];

  @OneToMany(() => Income, (income) => income.shop, {
    cascade: ['soft-remove'],
  })
  incomes: Income[];

  @ManyToOne(() => User, (user) => user.shops)
  user: User;
}
