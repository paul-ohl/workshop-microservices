import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AnimalService } from './services/animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) { }

    // Créer un nouvel animal
    @Post()
    async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
        return this.animalService.createAnimal(createAnimalDto);
    }

    // Créer une nouvelle catégorie
    @Post('/category')
    async createCategory(@Body('name') name: string) {
        return this.animalService.createCategory(name);
    }

    // Obtenir tous les animaux
    @Get()
    async getAllAnimals() {
        return this.animalService.getAllAnimals();
    }

    // Obtenir un animal par ID
    @Get(':id')
    async getAnimalById(@Param('id') id: string) {
        return this.animalService.getAnimalById(id);
    }

    // Mettre à jour un animal
    @Patch(':id')
    async updateAnimal(@Param('id') id: string, @Body() updateData: Partial<CreateAnimalDto>) {
        return this.animalService.updateAnimal(id, updateData);
    }

    // Supprimer un animal
    @Delete(':id')
    async deleteAnimal(@Param('id') id: string) {
        return this.animalService.deleteAnimal(id);
    }
}
