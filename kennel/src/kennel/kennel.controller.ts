import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { KennelService } from './kennel.service';
import { Kennel as KennelModel } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('kennel')
@ApiBearerAuth()
@Controller('/kennel')
export class KennelController {
  constructor(private readonly kennelService: KennelService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all the kennels.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async getAllKennels() {
    return this.kennelService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the kennel thanks his id.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async getKennelById(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.findKennelById(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Retrieved the kennel created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard)
  async createNewKennel(
    @Body()
    kennelData,
  ): Promise<KennelModel> {
    return this.kennelService.createKennel(kennelData);
  }

  @Patch('updateKennel/:id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved the updated kennel.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
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
  @ApiResponse({
    status: 200,
    description: 'Deleted the kennel.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async deleteKennel(@Param('id') id: string): Promise<KennelModel> {
    return this.kennelService.deleteKennel(id);
  }

  @Patch('addProduct/:id')
  @ApiResponse({
    status: 200,
    description: 'Added a product to the kennel.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
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
  @ApiResponse({
    status: 200,
    description: 'Added a vet to the kennel.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
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
  @ApiResponse({
    status: 200,
    description: 'Added an animal to the kennel.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
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
