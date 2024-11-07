import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart as CartModel } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @Get('/')
  async getCarts(): Promise<CartModel[]> {
    return this.cartService.getAllCarts();
  }

  @Get('/:id')
  async getCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.getCart({ id: id });
  }

  @Get('/user/:userId')
  async getCartsByUserId(@Param('userId') userId: string): Promise<CartModel[]> {
    return this.cartService.getCartsByUserId(userId);
  }

  @Post('')
  async createCart(): Promise<CartModel> {
    return this.cartService.createCart({
      creatorId: '1',
    });
  }

  @Delete('/:id')
  async deleteCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.deleteCart({ id: id });
  }

  @Get('/:id/sell')
  async sellCart(@Param('id') id: number) {
    // TODO
  }
}
