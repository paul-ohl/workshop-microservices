import { Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('cart')
export class CartController {
  private readonly cartServiceUrl = process.env.CART_SERVICE_URL;
  constructor(private readonly fetcher: FetcherService) {}

  @Get('carts')
  @ApiResponse({ status: 200, description: 'Retrieved all the carts.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getCarts(): Promise<string> {
    return this.fetcher.get(`${this.cartServiceUrl}/carts`);
  }

  @Get('cart/:id')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async getCart(@Param('id') id: number): Promise<string> {
    return this.fetcher.get(`${this.cartServiceUrl}/cart/${id}`);
  }

  @Get('carts/user/:userId')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the carts from the user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User does not exist.' })
  async getCartsByUserId(
    @Param('userId') userId: string | undefined,
    @Request() req,
  ): Promise<string> {
    return this.fetcher.get(
      `${this.cartServiceUrl}/carts/user/${userId || req.user.id}`,
    );
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
  async createCart(@Request() req): Promise<string> {
    return this.fetcher.post(`${this.cartServiceUrl}/cart`, {
      userId: req.user.id,
    });
  }

  @Delete('cart/:id')
  @ApiResponse({ status: 200, description: 'Deleted the cart.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async deleteCart(@Param('id') id: number): Promise<string> {
    return this.fetcher.delete(`${this.cartServiceUrl}/cart/${id}`);
  }

  @Get('cart/:id/sell')
  @ApiResponse({ status: 200, description: 'Retrieved the cart.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async sellCart(@Param('id') id: number): Promise<string> {
    return this.fetcher.get(`${this.cartServiceUrl}/cart/${id}/sell`);
  }
}
