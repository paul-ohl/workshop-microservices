import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartService } from './cart/cart.service';
import { ItemService } from './item/item.service';
import { CartController } from './cart/cart.controller';
import { ItemController } from './item/item.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, CartController, ItemController],
  providers: [AppService, CartService, ItemService, PrismaService],
})
export class AppModule { }
