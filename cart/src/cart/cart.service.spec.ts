import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ItemService } from '../item/item.service';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

describe('CartService', () => {
  let service: CartService;

  const mockItemService = {
    getItemsFromCart: jest.fn<
      Promise<
        {
          id: number;
          price: number;
          quantity: number;
        }[]
      >,
      [Prisma.CartWhereUniqueInput]
    >(),
    deleteItem: jest.fn((_id: number) => {
      return {};
    }),
  };
  const mockPrismaService = {
    cart: {
      findMany: jest.fn(() => {
        return [];
      }),
      findUnique: jest.fn<
        Promise<{
          id: number;
          creatorId: string;
        }>,
        [Prisma.CartWhereUniqueInput]
      >(),
      create: jest.fn((data: { creatorId: string }) => {
        return {
          id: 1,
          creatorId: data.creatorId,
        };
      }),
      update: jest.fn((_id: number) => {
        return {};
      }),
      delete: jest.fn((_id: number) => {
        return {};
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, ItemService, PrismaService],
    })
      .overrideProvider(ItemService)
      .useValue(mockItemService)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch all carts', async () => {
    await service.getAllCarts();
    expect(mockPrismaService.cart.findMany).toHaveBeenCalled();
  });

  it('should fetch a cart by id', async () => {
    await service.getCart({ id: 1 });
    expect(mockPrismaService.cart.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should fetch carts by user id', async () => {
    await service.getCartsByUserId('abcd');
    expect(mockPrismaService.cart.findMany).toHaveBeenCalledWith({
      where: {
        creatorId: 'abcd',
      },
    });
  });

  it('should create a cart', async () => {
    await service.createCart({ creatorId: 'abcd' });
    expect(mockPrismaService.cart.create).toHaveBeenCalledWith({
      data: { creatorId: 'abcd' },
    });
  });

  it('should update a cart', async () => {
    await service.updateCart({ where: { id: 1 }, data: {} });
    expect(mockPrismaService.cart.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {},
    });
  });

  it('should delete a cart', async () => {
    const mockItems = [
      { id: 1, price: 100, quantity: 2 },
      { id: 2, price: 50, quantity: 1 },
    ];
    mockItemService.getItemsFromCart.mockResolvedValue(mockItems);

    await service.deleteCart({ id: 1 });
    expect(mockItemService.getItemsFromCart).toHaveBeenCalled();
    expect(mockItemService.deleteItem).toHaveBeenCalled();
    expect(mockPrismaService.cart.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should sell a cart', async () => {
    const mockCart = { id: 1, creatorId: 'user1' };
    const mockItems = [
      { id: 1, price: 100, quantity: 2 },
      { id: 2, price: 50, quantity: 1 },
    ];
    const mockResponse = { status: 'success' };

    mockItemService.getItemsFromCart.mockResolvedValue(mockItems);
    mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await service.sellCart(1);

    expect(mockItemService.getItemsFromCart).toHaveBeenCalledWith({ id: 1 });
    expect(mockPrismaService.cart.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(fetch).toHaveBeenCalledWith(
      'http://undefined/pay-cart',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          id: 1,
          ownerId: 'user1',
          items: [
            { id: 1, name: 'name1', price: 100, quantity: 2 },
            { id: 2, name: 'name2', price: 50, quantity: 1 },
          ],
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(result).toEqual(mockResponse);
  });
});
