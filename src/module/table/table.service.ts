import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY') private tableRepository: Repository<Table>,
  ) {}
  async getTable(): Promise<Table[]> {
    return await this.tableRepository.find();
  }

  async getTableById(id: string): Promise<Table | null> {
    return await this.tableRepository.findOne({
      where: { id: id },
    });
  }
  async getTableByShopId(id: string): Promise<Table[]> {
    return await this.tableRepository.find({
      where: { shop: { id: id } },
    });
  }
  async createTable(table: Partial<Table>, shopId: string): Promise<Table[]> {
    await this.tableRepository.save(
      this.tableRepository.create({
        ...table,
        shop: table.shop,
      }),
    );
    return await this.getTableByShopId(shopId);
  }

  async deleteTable(id: string, shopId: string): Promise<Table[] | null> {
    const table = await this.getTableById(id);
    if (table) {
      await this.tableRepository.softDelete(id);
      return await this.getTableByShopId(shopId);
    }
    return null;
  }
}
