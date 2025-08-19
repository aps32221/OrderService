import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TableService } from './table.service';
import { Table } from './table.entity';
import { CreateTable, DeleteTable } from '../../dto/user.dto';

@Controller()
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async getAllTable(): Promise<Table[]> {
    return await this.tableService.getTable();
  }

  @Get('shop/:id')
  async getTableByShopId(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let tables: Table[] | null = null;
    try {
      tables = await this.tableService.getTableByShopId(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (tables !== null) res.status(HttpStatus.OK).send(tables);
  }

  @Get(':id')
  async getTableById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let table: Table | null = null;
    try {
      table = await this.tableService.getTableById(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (table !== null) res.status(HttpStatus.OK).send(table);
  }

  @Post()
  async createItem(
    @Res() res: Response,
    @Body() table: CreateTable,
  ): Promise<void> {
    let tables: Table[] = [];
    try {
      tables = await this.tableService.createTable(table.table, table.shopId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    res.status(HttpStatus.CREATED).send(tables);
  }

  @Delete(':tableId/:shopId')
  async deleteTable(
    @Res() res: Response,
    @Param() { tableId, shopId }: DeleteTable,
  ): Promise<void> {
    let table: Table[] | null = [];
    try {
      table = await this.tableService.deleteTable(tableId, shopId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (table !== null) res.status(HttpStatus.OK).send(table);
  }
}
