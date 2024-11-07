import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  getAllCarts(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  getCart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput): Promise<Cart | null> {
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
    return this.prisma.cart.delete({
      where,
    });
  }
}
