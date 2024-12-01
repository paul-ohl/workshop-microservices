import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let controller: CartController;

  const mockCartService = {
    getAllCarts: jest.fn(() => {
      return [];
    }),
    getCart: jest.fn((_id: number) => {
      return {};
    }),
    getCartsByUserId: jest.fn((_userId: string) => {
      return [];
    }),
    createCart: jest.fn((data: { creatorId: string }) => {
      return {
        id: 1,
        creatorId: data.creatorId,
      };
    }),
    deleteCart: jest.fn((_id: number) => {
      return {};
    }),
    sellCart: jest.fn((_id: number) => {
      return 'Sold';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    })
      .overrideProvider(CartService)
      .useValue(mockCartService)
      .compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use the jwts payload to get the user id if user id is undefined', async () => {
    const uuid1 = 'abcd';
    const uuid2 = '1234';
    const req = {
      user: {
        id: uuid2,
      },
    };

    expect(await controller.getCartsByUserId(uuid1, req)).toEqual([]);
    expect(mockCartService.getCartsByUserId).toHaveBeenCalledWith(uuid1);

    expect(await controller.getCartsByUserId(undefined, req)).toEqual([]);
    expect(mockCartService.getCartsByUserId).toHaveBeenCalledWith(uuid2);
  });

  it('should call the correct service methods', async () => {
    expect(await controller.getCarts()).toEqual([]);
    expect(mockCartService.getAllCarts).toHaveBeenCalled();

    expect(await controller.getCart(1)).toEqual({});
    expect(mockCartService.getCart).toHaveBeenCalledWith({ id: 1 });

    expect(await controller.createCart({ user: { id: 'abcd' } })).toEqual({
      id: 1,
      creatorId: 'abcd',
    });
    expect(mockCartService.createCart).toHaveBeenCalledWith({
      creatorId: 'abcd',
    });

    expect(await controller.deleteCart(1)).toEqual({});
    expect(mockCartService.deleteCart).toHaveBeenCalledWith({ id: 1 });

    expect(await controller.sellCart(1)).toEqual('Sold');
    expect(mockCartService.sellCart).toHaveBeenCalledWith(1);
  });
});
