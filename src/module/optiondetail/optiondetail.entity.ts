import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Option } from '../option/option.entity';
import { OrderDetail } from '../orderdetail/orderdetail.entity';
import { OptionType } from '../optiontype/optiontype.entity';

@Entity()
export class OptionDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Option, (option) => option.optionDetails)
  option: Option;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail)
  orderDetail: OrderDetail;

  @ManyToOne(() => OptionType, (optionType) => optionType)
  optionType: OptionType;

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
