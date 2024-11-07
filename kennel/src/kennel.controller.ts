import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { KennelService } from './kennel.service';
import { Kennel as KennelModel } from '@prisma/client';

@Controller('/kennel')
export class KennelController {
  constructor(private readonly kennelService: KennelService) {}

  @Get('/:id')
  async getKennelById(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.kennel({ id: id });
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
    @Body('kennelData') kennelData,
  ): Promise<KennelModel> {
    const { name, address, productsId, vets, animals } = kennelData;
    return this.kennelService.updateKennel({
      where: { id: id },
      data: { name, address, productsId, vets, animals },
    });
  }

  @Delete('delete/:id')
  async deleteKennel(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.deleteKennel({ id: id });
  }

  @Put('addProduct/:id')
  async addProduct(
    @Param('id') id: string,
    @Body('kennelData') kennelData,
  ): Promise<KennelModel> {
    const { productsId } = kennelData;
    return this.kennelService.addProduct({
      where: { id: id },
      data: { productsId },
    });
  }

  @Put('addVet/:id')
  async addVet(
    @Param('id') id: string,
    @Body('kennelData') kennelData,
  ): Promise<KennelModel> {
    const { vets } = kennelData;
    return this.kennelService.addVet({
      where: { id: id },
      data: { vets },
    });
  }

  @Put('addAnimal/:id')
  async addAnimal(
    @Param('id') id: string,
    @Body('kennelData') kennelData,
  ): Promise<KennelModel> {
    const { animals } = kennelData;
    return this.kennelService.addAnimal({
      where: { id: id },
      data: { animals },
    });
  }
}
