import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { KennelService } from './kennel.service';
import { Kennel as KennelModel } from '@prisma/client';

@Controller('/kennel')
export class KennelController {
  constructor(private readonly kennelService: KennelService) {}

  @Get()
  async getAllKennels() {
    return this.kennelService.findAll();
  }

  @Get('/:id')
  async getKennelById(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.findKennelById(id);
  }

  @Post()
  async createNewKennel(
    @Body()
    kennelData,
  ): Promise<KennelModel> {
    return this.kennelService.createKennel(kennelData);
  }

  @Patch('updateKennel/:id')
  async updateKennel(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<KennelModel> {
    const { name, address, productsId, vets, animals } = kennelData;
    return this.kennelService.updateKennel({
      id,
      data: { name, address, productsId, vets, animals },
    });
  }

  @Delete('delete/:id')
  async deleteKennel(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.deleteKennel(id);
  }

  @Patch('addProduct/:id')
  async addProduct(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<KennelModel> {
    const { productsId } = kennelData;
    return this.kennelService.addProduct({
      id,
      data: { productsId },
    });
  }

  @Patch('addVet/:id')
  async addVet(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<KennelModel> {
    const { vets } = kennelData;
    return this.kennelService.addVet({
      id,
      data: { vets },
    });
  }

  @Patch('addAnimal/:id')
  async addAnimal(
    @Param('id') id: string,
    @Body('kennelData') kennelData: any,
  ): Promise<KennelModel> {
    const { animals } = kennelData;
    return this.kennelService.addAnimal({
      id,
      data: { animals },
    });
  }
}
