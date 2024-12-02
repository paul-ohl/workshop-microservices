import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('vet')
export class VetController {
  private readonly cartServiceUrl = process.env.CART_SERVICE_URL;
  constructor(private readonly fetcher: FetcherService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all vets.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findAll() {
    return await this.fetcher.get(`${this.cartServiceUrl}/vet`);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get one vet.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findVet(@Param('id') id: string) {
    return await this.fetcher.get(`${this.cartServiceUrl}/vet/${id}`);
  }

  @Get('/categories/:categories')
  @ApiResponse({ status: 200, description: 'Get vets by categories.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findVetByCategories(@Param('categories') categories: string) {
    return await this.fetcher.get(
      `${this.cartServiceUrl}/vet/categories/${categories}`,
    );
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Vet created.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async createVet(@Body() createVetBody: any) {
    return await this.fetcher.post(`${this.cartServiceUrl}/vet`, createVetBody);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Vet updated.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async updateVet(@Param('id') id: string, @Body() updateVetBody: any) {
    return await this.fetcher.patch(
      `${this.cartServiceUrl}/vet/${id}`,
      updateVetBody,
    );
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Vet deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async deleteVet(@Param('id') id: string) {
    return await this.fetcher.delete(`${this.cartServiceUrl}/vet/${id}`);
  }
}
