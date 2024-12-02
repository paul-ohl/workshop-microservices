import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('product')
export class ProductController {
  private readonly kennelServiceUrl = process.env.KENNEL_SERVICE_URL;
  constructor(private readonly fetcher: FetcherService) {}

  @Get()
  async getAllProducts() {
    return await this.fetcher.get(`${this.kennelServiceUrl}/product`);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<string> {
    return await this.fetcher.get(`${this.kennelServiceUrl}/product/${id}`);
  }

  @Post()
  async createNewProduct(@Body() productData: any): Promise<string> {
    return await this.fetcher.post(
      `${this.kennelServiceUrl}/product`,
      productData,
    );
  }

  @Patch('updateProduct/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body('productData') productData: any,
  ): Promise<string> {
    return await this.fetcher.patch(
      `${this.kennelServiceUrl}/product/update/${id}`,
      productData,
    );
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    return await this.fetcher.delete(
      `${this.kennelServiceUrl}/product/delete/${id}`,
    );
  }
}
