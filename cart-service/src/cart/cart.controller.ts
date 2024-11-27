import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart as CartModel } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@Controller()
export class CartController {
  constructor(private cartService: CartService) { }

  @Get('carts')
  @ApiResponse({ status: 200, description: 'Retrieved all the carts.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async getCarts(): Promise<CartModel[]> {
    return this.cartService.getAllCarts();
  }

  @Get('cart/:id')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async getCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.getCart({ id: +id });
  }

  @Get('carts/user/:userId')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the carts from the user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User does not exist.' })
  @UseGuards(AuthGuard)
  async getCartsByUserId(
    @Param('userId') userId: string | undefined,
    @Request() req,
  ): Promise<CartModel[]> {
    return this.cartService.getCartsByUserId(userId || req.user.id);
  }

  @Post('cart')
  @ApiResponse({
    status: 201,
    description: 'Created the cart.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        creatorId: {
          type: 'string',
          example: 'e95eb887-5436-4a8f-8bf0-24af20775e41',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async createCart(@Request() req): Promise<CartModel> {
    return this.cartService.createCart({
      creatorId: req.user.id,
    });
  }

  @Delete('cart/:id')
  @ApiResponse({ status: 200, description: 'Deleted the cart.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async deleteCart(@Param('id') id: number): Promise<CartModel> {
    return this.cartService.deleteCart({ id: +id });
  }

  @Get('cart/:id/sell')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async sellCart(@Param('id') id: number, @Request() req) {
    return this.cartService.sellCart(+id, req.headers.authorization);
  }
}
