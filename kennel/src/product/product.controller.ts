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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('product')
@ApiBearerAuth()
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieved all the products.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the product thanks his id.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.findProductById(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Retrieved the product created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async createNewProduct(
    @Body()
    productData,
  ): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Patch('updateProduct/:id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the updated product.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
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
  @ApiResponse({
    status: 200,
    description: 'Deleted the product.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct(id);
  }
}
