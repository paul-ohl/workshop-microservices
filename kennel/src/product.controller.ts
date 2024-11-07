import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product as ProductModel } from '@prisma/client';

@Controller('/product')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.product({ id: id });
  }

  @Post()
  async createNewProduct(
    @Body()
    productData,
  ): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Put('updateProduct/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body('productData') productData,
  ): Promise<ProductModel> {
    const { name, price, stock } = productData;
    return this.productService.updateProduct({
      where: { id: id },
      data: { name, price, stock },
    });
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id: id });
  }
}
