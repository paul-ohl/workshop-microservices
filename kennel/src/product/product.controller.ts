import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { Product as ProductModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.findProductById(id);
  }

  @Post()
  async createNewProduct(
    @Body()
    productData,
  ): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Patch('updateProduct/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body('productData') productData: any,
  ): Promise<ProductModel> {
    const { name, price, stock } = productData;
    return this.productService.updateProduct({
      id,
      data: { name, price, stock },
    });
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct(id);
  }
}
