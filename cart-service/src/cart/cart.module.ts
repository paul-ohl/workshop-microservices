import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';
import { ItemService } from 'src/item/item.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, ItemService],
})
export class CartModule {}
