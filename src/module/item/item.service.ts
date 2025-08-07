import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Item } from './item.entity';
import { OptionType } from '../optiontype/optiontype.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<Item>,
    @Inject('OPTION_TYPE_REPOSITORY')
    private optionTypeRepository: Repository<OptionType>,
  ) {}

  async getItem(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async getItemById(id: string): Promise<Item | null> {
    const item = await this.itemRepository.findOne({
      where: { id: id },
      relations: {
        optionTypes: {
          options: true,
        },
      },
    });
    if (item === null) return null;
    return item;
  }

  async getItemByShopId(id: string): Promise<Item[] | null> {
    const items = await this.itemRepository.find({
      where: { shop: { id: id } },
      relations: {
        optionTypes: {
          options: true,
        },
      },
    });
    if (items.length === 0) return null;
    return items;
  }

  async createItem(item: Partial<Item>, optionTypeId: string[]): Promise<Item> {
    const newItem = await this.itemRepository.save(
      this.itemRepository.create({
        ...item,
      }),
    );
    await this.optionTypeRepository.update(
      { id: In(optionTypeId) },
      { item: newItem },
    );
    return newItem;
  }

  async deleteItem(id: string): Promise<Item | null> {
    const item = await this.itemRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });
    if (item === null) return null;
    await this.itemRepository.softRemove(item);
    return item;
  }
}
