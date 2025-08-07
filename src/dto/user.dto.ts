import { Item } from 'src/module/item/item.entity';
import { Option } from '../module/option/option.entity';
import { OptionDetail } from 'src/module/optiondetail/optiondetail.entity';
export class CreateUserDto {
  email: string;
  password: string;
}

export class FindUserByEmailDto {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
}

export class FindUserByLoginDto {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class CreateOptionByTypeDto {
  typeId: string[];
  option: Partial<Option>;
}

export class CreateItemByType {
  typeId: string[];
  item: Partial<Item>;
}

export class DeleteItemById {
  itemId: string;
  shopId: string;
}

export class CreateTable {
  shopId: string;
  table: Partial<Item>;
}

export class DeleteTable {
  tableId: string;
  shopId: string;
}

export class CreateOrderDetail {
  amount: number;
  item: Partial<Item>;
  optionDetails: Partial<OptionDetail>[];
}
