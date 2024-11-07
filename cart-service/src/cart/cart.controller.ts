import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart as CartModel } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('carts')
  @ApiResponse({ status: 200, description: 'Retrieved all the carts.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getCarts(): Promise<CartModel[]> {
    return this.cartService.getAllCarts();
  }

  @Get('cart/:id')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async getCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.getCart({ id: id });
  }

  @Get('carts/user/:userId')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the carts from the user.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User does not exist.' })
  async getCartsByUserId(
    @Param('userId') userId: string,
  ): Promise<CartModel[]> {
    return this.cartService.getCartsByUserId(userId);
  }

  @Post('cart')
  @ApiResponse({ status: 201, description: 'Created the cart.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createCart(): Promise<CartModel> {
    return this.cartService.createCart({
      creatorId: '1',
    });
  }

  @Delete('cart/:id')
  @ApiResponse({ status: 200, description: 'Deleted the cart.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async deleteCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.deleteCart({ id: id });
  }

  @Get('cart/:id/sell')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async sellCart(@Param('id') _id: number) {
    // TODO
  }
}
