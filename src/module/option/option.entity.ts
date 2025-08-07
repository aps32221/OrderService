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
import { OptionType } from '../optiontype/optiontype.entity';
import { OptionDetail } from '../optiondetail/optiondetail.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  additional_price: number;

  @ManyToOne(() => OptionType, (optiontypes) => optiontypes.options)
  optionType: OptionType;

  @OneToMany(() => OptionDetail, (optionDetail) => optionDetail.option, {
    cascade: ['soft-remove'],
  })
  optionDetails: OptionDetail[];

  @CreateDateColumn()
  create_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
