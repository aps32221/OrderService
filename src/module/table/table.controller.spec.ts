/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { MockFactory } from '../../utilities';
import { Table } from './table.entity';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { Response } from 'express';

describe('TableController', () => {
  let tableController: TableController;
  let tableService: TableService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TableController],
      providers: [
        {
          provide: TableService,
          useValue: MockFactory.getMock(TableService),
        },
      ],
    }).compile();

    tableController = moduleRef.get(TableController);
    tableService = moduleRef.get(TableService);
  });

  describe('getAllTable', () => {
    it('should return an array of tables', async () => {
      const mockTables = [new Table(), new Table()];
      jest
        .spyOn(tableService, 'getTable')
        .mockImplementation(
          async () => await new Promise<Table[]>((reso) => reso(mockTables)),
        );

      expect(await tableController.getAllTable()).toBe(mockTables);
      expect(tableService.getTable).toHaveBeenCalled();
    });
  });

  describe('getTableByShopId', () => {
    it('should return tables by shop id', async () => {
      const mockTables = [new Table(), new Table()];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const shopId = 'shop123';

      jest
        .spyOn(tableService, 'getTableByShopId')
        .mockImplementation(
          async () => await new Promise<Table[]>((reso) => reso(mockTables)),
        );

      await tableController.getTableByShopId(res as Response, shopId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockTables);
    });
    it('should handle errors', async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const shopId = 'shop123';

      jest
        .spyOn(tableService, 'getTableByShopId')
        .mockImplementation(
          async () => await Promise.reject(new Error('Error fetching tables')),
        );

      await tableController.getTableByShopId(res as Response, shopId);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getTableById', () => {
    it('should return a table by id', async () => {
      const mockTable = new Table();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const tableId = 'table123';

      jest
        .spyOn(tableService, 'getTableById')
        .mockImplementation(
          async () => await new Promise<Table>((reso) => reso(mockTable)),
        );

      await tableController.getTableById(res as Response, tableId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockTable);
    });

    it('should handle errors', async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const tableId = 'table123';

      jest
        .spyOn(tableService, 'getTableById')
        .mockImplementation(
          async () => await Promise.reject(new Error('Error fetching table')),
        );

      await tableController.getTableById(res as Response, tableId);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('createItem', () => {
    it('should create a table and return updated tables', async () => {
      const mockTables = [new Table(), new Table()];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const createTableDto = { table: new Table(), shopId: 'shop123' };

      jest
        .spyOn(tableService, 'createTable')
        .mockImplementation(
          async () => await new Promise<Table[]>((reso) => reso(mockTables)),
        );

      await tableController.createItem(res as Response, createTableDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockTables);
    });

    it('should handle errors during table creation', async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const createTableDto = { table: new Table(), shopId: 'shop123' };

      jest
        .spyOn(tableService, 'createTable')
        .mockImplementation(
          async () => await Promise.reject(new Error('Error creating table')),
        );

      await tableController.createItem(res as Response, createTableDto);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deleteTable', () => {
    it('should delete a table and return updated tables', async () => {
      const mockTables = [new Table(), new Table()];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const deleteTableDto = { tableId: 'table123', shopId: 'shop123' };

      jest
        .spyOn(tableService, 'deleteTable')
        .mockImplementation(
          async () => await new Promise<Table[]>((reso) => reso(mockTables)),
        );

      await tableController.deleteTable(res as Response, deleteTableDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockTables);
    });

    it('should handle errors during table deletion', async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const deleteTableDto = { tableId: 'table123', shopId: 'shop123' };

      jest
        .spyOn(tableService, 'deleteTable')
        .mockImplementation(
          async () => await Promise.reject(new Error('Error deleting table')),
        );

      await tableController.deleteTable(res as Response, deleteTableDto);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
