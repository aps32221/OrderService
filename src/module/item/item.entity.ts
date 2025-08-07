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
import { OrderDetail } from '../orderdetail/orderdetail.entity';
import { OptionType } from '../optiontype/optiontype.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => Shop, (shop) => shop.items)
  shop: Shop;

  @OneToMany(() => OptionType, (optionType) => optionType.item, {
    cascade: ['soft-remove'],
  })
  optionTypes: OptionType[];

  @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.item, {
    cascade: ['soft-remove'],
  })
  orderDetails: OrderDetail[];

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
