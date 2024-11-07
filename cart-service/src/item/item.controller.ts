import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item as ItemModel } from '@prisma/client';

@Controller()
export class ItemController {
  constructor(private itemService: ItemService) { }

  @Get('/cart/:cartId/items')
  getItems(@Param('cartId') cartId: number): Promise<ItemModel[]> {
    return this.itemService.getItemsFromCart({ id: cartId });
  }

  @Post('/cart/:cartId/item')
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
  deleteItem(@Param('itemId') itemId: number): Promise<ItemModel> {
    return this.itemService.deleteItem({ id: itemId });
  }
}
