import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { Product as ProductModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('product')
@ApiBearerAuth()
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.product({ id: id });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createNewProduct(
    @Body()
    productData,
  ): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Patch('updateProduct/:id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct({ id: id });
  }
}
