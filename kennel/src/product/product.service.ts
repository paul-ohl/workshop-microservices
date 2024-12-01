import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findProductById(id: string): Promise<Product | null> {
    const product = this.prisma.product.findUnique({
      where: { id },
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: {
    id: string;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { id, data } = params;
    const product = this.prisma.product.update({
      where: { id },
      data,
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = this.prisma.product.delete({
      where: { id },
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }
}
