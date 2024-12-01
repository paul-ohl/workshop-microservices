import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';
import exp from 'constants';

describe('ItemController', () => {
  let controller: ItemController;

  const mockItemService = {
    createItem: jest.fn((data: Prisma.ItemCreateInput) => {
      return {
        id: 1,
        price: data.price,
        quantity: data.quantity,
      };
    }),
    updateItem: jest.fn(
      (where: Prisma.ItemWhereUniqueInput, data: Prisma.ItemUpdateInput) => {
        return {
          id: where.id,
          price: data.price || 0,
          quantity: data.quantity || 1,
        };
      },
    ),
    deleteItem: jest.fn((where: Prisma.ItemWhereUniqueInput) => {
      return {
        id: where.id,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
    })
      .overrideProvider(ItemService)
      .useValue(mockItemService)
      .compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should validate the createItem method', async () => {
    // Undefined price
    expect(() =>
      controller.createItem(1, { price: undefined, quantity: 1 }),
    ).toThrow('Price is required');

    // Quantity less than 1
    expect(() =>
      controller.createItem(1, { price: 1.0, quantity: -1 }),
    ).toThrow('Quantity must be greater than 0');

    // Quantity is zero
    expect(() => controller.createItem(1, { price: 1.0, quantity: 0 })).toThrow(
      'Quantity must be greater than 0',
    );
  });

  it('should default the quantity to 1', async () => {
    const item = await controller.createItem(1, {
      price: 1.0,
      quantity: undefined,
    });

    expect(item.quantity).toBe(1);
  });

  it('should delete an item if the quantity is 0', async () => {
    await controller.updateItem(1, {
      quantity: 0,
    });

    expect(mockItemService.deleteItem).toHaveBeenCalled();
    expect(mockItemService.updateItem).not.toHaveBeenCalled();
  });
});
