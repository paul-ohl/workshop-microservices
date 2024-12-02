import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { firstValueFrom } from 'rxjs';

@Controller('animal')
export class AppController {
  private readonly animalServiceUrl = 'http://animal:3008'; // URL du service animal

  constructor(private readonly httpService: HttpService) {}

  // Obtenir tous les animaux
  @Get()
  async getAllAnimals() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.animalServiceUrl}/animals`),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des animaux :',
        error.message,
      );
      throw new HttpException(
        error.response?.data || 'Erreur lors de la récupération des animaux',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtenir un animal par ID
  @Get('/:id')
  async getAnimalById(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.animalServiceUrl}/animals/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'animal :",
        error.message,
      );
      throw new HttpException(
        error.response?.data || "Erreur lors de la récupération de l'animal",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Créer un nouvel animal
  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.animalServiceUrl}/animals`,
          createAnimalDto,
        ),
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'animal :", error.message);
      throw new HttpException(
        error.response?.data || "Erreur lors de la création de l'animal",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Créer une catégorie
  @Post('/category')
  async createCategory(@Body('name') name: string) {
    if (!name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.animalServiceUrl}/animals/category`, {
          name,
        }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la création de la catégorie :',
        error.message,
      );
      throw new HttpException(
        error.response?.data || 'Erreur lors de la création de la catégorie',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Mettre à jour un animal
  @Patch('/:id')
  async updateAnimal(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateAnimalDto>,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(
          `${this.animalServiceUrl}/animals/${id}`,
          updateData,
        ),
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'animal :",
        error.message,
      );
      throw new HttpException(
        error.response?.data || "Erreur lors de la mise à jour de l'animal",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Supprimer un animal
  @Delete('/:id')
  async deleteAnimal(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.animalServiceUrl}/animals/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'animal :",
        error.message,
      );
      throw new HttpException(
        error.response?.data || "Erreur lors de la suppression de l'animal",
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
