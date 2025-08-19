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
import { Item } from '../item/item.entity';
import { Order } from '../order/order.entity';
import { OptionDetail } from '../optiondetail/optiondetail.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.orderDetails)
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @OneToMany(() => OptionDetail, (optionDetail) => optionDetail.orderDetail)
  optionDetails: OptionDetail[];

  @Column()
  amount: number;

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
