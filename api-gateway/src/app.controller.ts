import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { firstValueFrom } from 'rxjs';

@Controller('animal')
export class AppController {
  private readonly animalServiceUrl = 'http://animal:3001'; 

  constructor(private readonly httpService: HttpService) { }

  @Get()
  async getAnimals() {
    try {
      // Envoyer une requête GET au microservice animal
      const response = await firstValueFrom(this.httpService.get(`${this.animalServiceUrl}/animals`));
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des animaux :', error.message);
      throw error;
    }
  }

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.animalServiceUrl}/animal`, createAnimalDto),
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'animal :', error.message);
      throw error;
    }
  }
}
