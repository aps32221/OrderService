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
import { Option } from '../option/option.entity';
import { OptionDetail } from '../optiondetail/optiondetail.entity';

@Entity()
export class OptionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.optionTypes)
  item: Item;

  @OneToMany(() => Option, (option) => option.optionType, {
    cascade: ['soft-remove'],
  })
  options: Option[];

  @OneToMany(() => OptionDetail, (optionDetail) => optionDetail.optionType, {
    cascade: ['soft-remove'],
  })
  optionDetails: OptionDetail[];

  @Column()
  name: string;

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
