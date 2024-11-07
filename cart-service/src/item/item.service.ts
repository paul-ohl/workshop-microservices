import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) { }

  getItem(itemWhereUniqueInput: Prisma.ItemWhereUniqueInput) {
    return this.prisma.item.findUnique({
      where: itemWhereUniqueInput,
    });
  }

  getItemsFromCart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput) {
    return this.prisma.item.findMany({
      where: {
        cartId: cartWhereUniqueInput.id,
      },
    });
  }

  createItem(data: Prisma.ItemCreateInput) {
    return this.prisma.item.create({
      data,
    });
  }

  updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: Prisma.ItemUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.item.update({
      data,
      where,
    });
  }

  deleteItem(where: Prisma.ItemWhereUniqueInput) {
    return this.prisma.item.delete({
      where,
    });
  }
}
