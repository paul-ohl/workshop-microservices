import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  //UseGuards,
} from '@nestjs/common';
import { KennelService } from './kennel.service';
import { Kennel as KennelModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from '../auth/auth.guard';

@ApiTags('kennel')
@ApiBearerAuth()
@Controller('/kennel')
export class KennelController {
  constructor(private readonly kennelService: KennelService) {}

  @Get()
  //@UseGuards(AuthGuard)
  async getAlleKennels() {
    return this.kennelService.findAll();
  }

  @Get('/:id')
  //@UseGuards(AuthGuard)
  async getKennelById(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.findKennelById({ id: id });
  }

  @Post()
  //@UseGuards(AuthGuard)
  async createNewKennel(
    @Body()
    kennelData,
  ): Promise<KennelModel> {
    return this.kennelService.createKennel(kennelData);
  }

  @Patch('updateKennel/:id')
  //@UseGuards(AuthGuard)
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
  //@UseGuards(AuthGuard)
  async deleteKennel(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.deleteKennel({ id: id });
  }

  @Patch('addProduct/:id')
  //@UseGuards(AuthGuard)
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

  @Patch('addVet/:id')
  //@UseGuards(AuthGuard)
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

  @Patch('addAnimal/:id')
  //@UseGuards(AuthGuard)
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
