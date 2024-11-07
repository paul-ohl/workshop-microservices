import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart as CartModel } from '@prisma/client';

@Controller()
export class CartController {
  constructor(private cartService: CartService) { }

  @Get('carts')
  async getCarts(): Promise<CartModel[]> {
    return this.cartService.getAllCarts();
  }

  @Get('cart/:id')
  async getCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.getCart({ id: id });
  }

  @Get('carts/user/:userId')
  async getCartsByUserId(@Param('userId') userId: string): Promise<CartModel[]> {
    return this.cartService.getCartsByUserId(userId);
  }

  @Post('cart')
  async createCart(): Promise<CartModel> {
    return this.cartService.createCart({
      creatorId: '1',
    });
  }

  @Delete('cart/:id')
  async deleteCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.deleteCart({ id: id });
  }

  @Get('cart/:id/sell')
  async sellCart(@Param('id') _id: number) {
    // TODO
  }
}
