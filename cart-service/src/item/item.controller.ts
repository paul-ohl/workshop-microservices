import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item as ItemModel } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@ApiBearerAuth()
@Controller()
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('/cart/:cartId/items')
  @ApiResponse({
    status: 200,
    description: 'Retrieved all the items from the cart.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  getItems(@Param('cartId') cartId: number): Promise<ItemModel[]> {
    return this.itemService.getItemsFromCart({ id: cartId });
  }

  @Post('/cart/:cartId/item')
  @ApiResponse({ status: 201, description: 'Created the resource.' })
  @ApiResponse({ status: 400, description: 'Bad input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  createItem(
    @Param('cartId') cartId: number,
    @Body() itemData: { itemId: number; price: number; quantity?: number },
  ): Promise<ItemModel> {
    if (!itemData.price) {
      throw new Error('Price is required');
    }
    if (itemData.quantity && itemData.quantity < 1) {
      throw new Error('Quantity must be greater than 0');
    }
    return this.itemService.createItem({
      Cart: {
        connect: {
          id: cartId,
        },
      },
      price: itemData.price,
      quantity: itemData.quantity || 1,
    });
  }

  @Put('/cart/:cartId/item/:itemId')
  @ApiResponse({ status: 201, description: 'Updated the resource.' })
  @ApiResponse({ status: 400, description: 'Bad input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  updateItem(
    @Param('itemId') itemId: number,
    @Body() itemData: { price?: number; quantity?: number },
  ): Promise<ItemModel> {
    if (itemData.quantity && itemData.quantity < 1) {
      return this.deleteItem(itemId);
    }
    return this.itemService.updateItem({
      where: { id: itemId },
      data: itemData,
    });
  }

  @Delete('/cart/:cartId/item/:itemId')
  @ApiResponse({ status: 201, description: 'Deleted the resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  deleteItem(@Param('itemId') itemId: number): Promise<ItemModel> {
    return this.itemService.deleteItem({ id: itemId });
  }
}
