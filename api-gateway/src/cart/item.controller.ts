import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('item')
export class ItemController {
  constructor(private readonly fetcher: FetcherService) {}

  @Get('/cart/:cartId/items')
  @ApiResponse({
    status: 200,
    description: 'Retrieved all the items from the cart.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async getItems(@Param('cartId') cartId: number): Promise<string> {
    return await this.fetcher.get(`/cart/${cartId}/items`);
  }

  @Post('/cart/:cartId/item')
  @ApiResponse({ status: 201, description: 'Created the resource.' })
  @ApiResponse({ status: 400, description: 'Bad input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async createItem(
    @Param('cartId') cartId: number,
    @Body() itemData: any,
  ): Promise<string> {
    return await this.fetcher.post(`/cart/${cartId}/item`, itemData);
  }

  @Put('/cart/:cartId/item/:itemId')
  @ApiResponse({ status: 201, description: 'Updated the resource.' })
  @ApiResponse({ status: 400, description: 'Bad input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async updateItem(
    @Param('itemId') itemId: number,
    @Body() itemData: any,
  ): Promise<string> {
    return await this.fetcher.put(`/cart/${itemId}/item/${itemId}`, itemData);
  }

  @Delete('/cart/:cartId/item/:itemId')
  @ApiResponse({ status: 201, description: 'Deleted the resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async deleteItem(@Param('itemId') itemId: number): Promise<string> {
    return await this.fetcher.delete(`/cart/${itemId}/item/${itemId}`);
  }
}
