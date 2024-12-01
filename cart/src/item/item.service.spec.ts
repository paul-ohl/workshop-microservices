import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { PrismaService } from '../prisma.service';

describe('ItemService', () => {
  let service: ItemService;

  const mockPrismaService = {
    item: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch a specific item', async () => {
    const mockItem = { id: 1, quantity: 2, price: 100 };
    mockPrismaService.item.findUnique.mockResolvedValue(mockItem);

    const result = await service.getItem({ id: 1 });

    expect(mockPrismaService.item.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockItem);
  });

  it('should fetch items from a specific cart', async () => {
    const mockItems = [
      { id: 1, quantity: 2, price: 50 },
      { id: 2, quantity: 2, price: 75 },
    ];
    mockPrismaService.item.findMany.mockResolvedValue(mockItems);

    const result = await service.getItemsFromCart({ id: 1 });

    expect(mockPrismaService.item.findMany).toHaveBeenCalledWith({
      where: { cartId: 1 },
    });
    expect(result).toEqual(mockItems);
  });

  it('should create a new item', async () => {
    const mockItem = { id: 1, quantity: 2, price: 100 };
    const mockData = { price: 100, quantity: 2, cartId: 1 };
    mockPrismaService.item.create.mockResolvedValue(mockItem);

    const result = await service.createItem(mockData);

    expect(mockPrismaService.item.create).toHaveBeenCalledWith({
      data: mockData,
    });
    expect(result).toEqual(mockItem);
  });

  it('should update an item', async () => {
    const mockItem = { id: 1, quantity: 2, price: 150 };
    const mockParams = {
      where: { id: 1 },
      data: { quantity: 2, price: 150 },
    };
    mockPrismaService.item.update.mockResolvedValue(mockItem);

    const result = await service.updateItem(mockParams);

    expect(mockPrismaService.item.update).toHaveBeenCalledWith({
      where: mockParams.where,
      data: mockParams.data,
    });
    expect(result).toEqual(mockItem);
  });

  it('should delete an item', async () => {
    const mockItem = { id: 1, quantity: 2, price: 100 };
    mockPrismaService.item.delete.mockResolvedValue(mockItem);

    const result = await service.deleteItem({ id: 1 });

    expect(mockPrismaService.item.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockItem);
  });
});
