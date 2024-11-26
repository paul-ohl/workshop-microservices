import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { VetService } from './vet.service';
import { createVetDto } from './dto/createVet.dto';
import { updateVetDto } from './dto/updateVet.dto';
import { AuthGuard } from './auth/auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('vets')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Get all vets.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findAll() {
    return this.vetService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Get one vet.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async findVet(@Param('id') id: string) {
    return this.vetService.findVet(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Vet created.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  async createVet(@Body() createVetDto: createVetDto) {
    return this.vetService.createVet(createVetDto);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Vet updated.' })
  @ApiResponse({ status: 400, description: 'Wrong input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async updateVet(@Param('id') id: string, @Body() updateVetDto: updateVetDto) {
    return this.vetService.updateVet(id, updateVetDto);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Vet deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource does not exist.' })
  @UseGuards(AuthGuard)
  async deleteVet(@Param('id') id: string) {
    return this.vetService.deleteVet(id);
  }
}
