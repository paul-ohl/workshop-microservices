import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VetService } from './vet.service';
import { ApiResponse } from '@nestjs/swagger';
import { createVetDto } from './dto/createVet.dto';
import { updateVetDto } from './dto/updateVet.dto';

@Controller('vets')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all vets.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findAll() {
    return this.vetService.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get one vet.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findVet(@Param('id') id: string) {
    return this.vetService.findVetInfos(id);
  }

  @Get('/categories/:categories')
  @ApiResponse({ status: 200, description: 'Get vets by categories.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findVetByCategories(@Param('categories') categories: string) {
    return this.vetService.findVetByCategories(categories.split(','));
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Vet created.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async createVet(@Body() createVetBody: createVetDto) {
    return this.vetService.createVet(createVetBody);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Vet updated.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async updateVet(
    @Param('id') id: string,
    @Body() updateVetBody: updateVetDto,
  ) {
    return this.vetService.updateVet(id, updateVetBody);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Vet deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async deleteVet(@Param('id') id: string) {
    return this.vetService.deleteVet(id);
  }
}
