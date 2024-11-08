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
import { createVetDto } from './dto/createVet.dto';
import { updateVetDto } from './dto/updateVet.dto';

@Controller('vets')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Get()
  async findAll() {
    return this.vetService.findAll();
  }

  @Get('/:id')
  async findVet(@Param('id') id: string) {
    return this.vetService.findVet(id);
  }

  @Post()
  async createVet(@Body() createVetDto: createVetDto) {
    return this.vetService.createVet(createVetDto);
  }

  @Patch('/:id')
  async updateVet(@Param('id') id: string, @Body() updateVetDto: updateVetDto) {
    return this.vetService.updateVet(id, updateVetDto);
  }

  @Delete('/:id')
  async deleteVet(@Param('id') id: string) {
    return this.vetService.deleteVet(id);
  }
}
