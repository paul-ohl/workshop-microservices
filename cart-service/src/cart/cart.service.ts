import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { ItemService } from 'src/item/item.service';
import { PrismaService } from 'src/prisma.service';
import { PayCart } from 'src/types/payCart';
import { PayItem } from 'src/types/payItem';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private readonly itemService: ItemService,
  ) {}

  getAllCarts(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  getCart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: cartWhereUniqueInput,
    });
  }

  getCartsByUserId(userId: string): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      where: {
        creatorId: userId,
      },
    });
  }

  async createCart(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({
      data,
    });
  }

  async updateCart(params: {
    where: Prisma.CartWhereUniqueInput;
    data: Prisma.CartUpdateInput;
  }): Promise<Cart> {
    const { where, data } = params;
    return this.prisma.cart.update({
      data,
      where,
    });
  }

  async deleteCart(where: Prisma.CartWhereUniqueInput): Promise<Cart> {
    let cartItems = await this.itemService.getItemsFromCart(where);
    cartItems.forEach(async (item) => {
      await this.itemService.deleteItem({ id: item.id });
    });
    return this.prisma.cart.delete({
      where,
    });
  }

  async sellCart(cartId: number): Promise<String> {
    const cartItems = await this.itemService.getItemsFromCart({ id: cartId });
    const cartItemsWithNames: PayItem[] = await Promise.all(
      cartItems.map(async (item) => {
        return {
          id: item.id,
          name: 'name' + item.id, // get item name from kennel API
          price: item.price,
          quantity: item.quantity,
        };
      }),
    );
    const cartInfo = await this.getCart({ id: cartId });

    const finalCart: PayCart = {
      id: cartId,
      ownerId: cartInfo.creatorId,
      items: cartItemsWithNames,
    };
    return 'Cart sold!';
  }
}
