import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma.service';
import { CartService } from './cart.service';
import { ItemService } from '../item/item.service';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService, ItemService, PrismaService],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
