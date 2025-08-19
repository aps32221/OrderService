/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TableService } from './table.service';
import { Table } from './table.entity';

describe('TableService', () => {
  let service: TableService;

  const mockTableRepo = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest
      .fn()
      .mockImplementation((table: Partial<Table>) => table as Table),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TABLE_REPOSITORY',
          useValue: mockTableRepo,
        },
        TableService,
      ],
    }).compile();

    service = module.get<TableService>(TableService);
  });

  describe('getTable', () => {
    it('should repository.find be executed', async () => {
      await service.getTable();
      expect(mockTableRepo.find).toHaveBeenCalled();
    });
  });

  describe('getTableById', () => {
    it('should repository.find be executed with the correct id', async () => {
      const tableId = '1';
      await service.getTableById(tableId);
      expect(mockTableRepo.findOne).toHaveBeenCalledWith({
        where: { id: tableId },
      });
    });
  });

  describe('getTableByShopId', () => {
    it('should repository.find be executed with the correct shop id', async () => {
      const shopId = '1';
      await service.getTableByShopId(shopId);
      expect(mockTableRepo.find).toHaveBeenCalledWith({
        where: { shop: { id: shopId } },
      });
    });
  });

  describe('createTable', () => {
    it('should repository.create be executed with the correct data', async () => {
      const shopId = '1';
      const createTableDto = { name: 'New Table', shopId: shopId };
      jest.spyOn(service, 'getTableByShopId').mockResolvedValue([]);
      await service.createTable(createTableDto, shopId);
      expect(mockTableRepo.save).toHaveBeenCalledWith(createTableDto);
      expect(mockTableRepo.create).toHaveBeenCalledWith(createTableDto);
      expect(service.getTableByShopId).toHaveBeenCalledWith(shopId);
    });
  });

  describe('deleteTable', () => {
    it('should repository.delete return null if not found', async () => {
      const tableId = '1';
      const shopId = '1';
      jest.spyOn(service, 'getTableById').mockResolvedValue(null);
      const result = await service.deleteTable(tableId, shopId);
      expect(result).toBeNull();
    });

    it('should repository.softDelete be executed if found', async () => {
      const tableId = '1';
      const shopId = '1';
      jest
        .spyOn(service, 'getTableById')
        .mockImplementation(async () =>
          Promise.resolve({ id: tableId, shop: { id: shopId } } as Table),
        );
      jest.spyOn(service, 'getTableByShopId').mockResolvedValue([]);
      await service.deleteTable(tableId, shopId);
      expect(mockTableRepo.softDelete).toHaveBeenCalledWith(tableId);
      expect(service.getTableByShopId).toHaveBeenCalledWith(shopId);
    });
  });
});
