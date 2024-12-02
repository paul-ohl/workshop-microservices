import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('kennel')
export class KennelController {
  private readonly kennelServiceUrl = process.env.KENNEL_SERVICE_URL;
  constructor(private readonly fetcher: FetcherService) { }

  @Get()
  async getAllKennels() {
    return await this.fetcher.get(`${this.kennelServiceUrl}`);
  }

  @Get('/:id')
  async getKennelById(@Param('id') id: string): Promise<string> {
    return await this.fetcher.get(`${this.kennelServiceUrl}/${id}`);
  }

  @Post()
  async createNewKennel(
    @Body()
    kennelData,
  ): Promise<string> {
    return await this.fetcher.post(`${this.kennelServiceUrl}`, kennelData);
  }

  @Patch('updateKennel/:id')
  async updateKennel(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<string> {
    return await this.fetcher.patch(`${this.kennelServiceUrl}/update/${id}`, kennelData);
  }

  @Delete('delete/:id')
  async deleteKennel(@Param('id') id: string): Promise<string> {
    return await this.fetcher.delete(`${this.kennelServiceUrl}/delete/${id}`);
  }

  @Patch('addProduct/:id')
  async addProduct(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<string> {
    return await this.fetcher.patch(`${this.kennelServiceUrl}/addProduct/${id}`, kennelData);
  }

  @Patch('addVet/:id')
  async addVet(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<string> {
    return await this.fetcher.patch(`${this.kennelServiceUrl}/addVet/${id}`, kennelData);
  }

  @Patch('addAnimal/:id')
  async addAnimal(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<string> {
    return await this.fetcher.patch(`${this.kennelServiceUrl}/addAnimal/${id}`, kennelData);
  }
}
