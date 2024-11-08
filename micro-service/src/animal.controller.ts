import { Controller, Post, Body, Get, Param, Patch, Delete, Logger } from '@nestjs/common';
import { AnimalService } from './services/animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalController {
    private readonly logger = new Logger(AnimalController.name);

    constructor(private readonly animalService: AnimalService) { }

    // Créer un nouvel animal
    @Post()
    async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
        this.logger.debug(`Creating animal with data: ${JSON.stringify(createAnimalDto)}`);
        const result = await this.animalService.createAnimal(createAnimalDto);
        this.logger.debug(`Animal created: ${JSON.stringify(result)}`);
        return result;
    }

    // Créer une nouvelle catégorie
    @Post('/category')
    async createCategory(@Body('name') name: string) {
        this.logger.debug(`Creating category with name: ${name}`);
        const result = await this.animalService.createCategory(name);
        this.logger.debug(`Category created: ${JSON.stringify(result)}`);
        return result;
    }

    // Obtenir tous les animaux
    @Get()
    async getAllAnimals() {
        this.logger.debug('Fetching all animals');
        const result = await this.animalService.getAllAnimals();
        this.logger.debug(`All animals: ${JSON.stringify(result)}`);
        return result;
    }

    // Obtenir un animal par ID
    @Get(':id')
    async getAnimalById(@Param('id') id: string) {
        this.logger.debug(`Fetching animal by ID: ${id}`);
        const result = await this.animalService.getAnimalById(id);
        this.logger.debug(`Animal fetched: ${JSON.stringify(result)}`);
        return result;
    }

    // Mettre à jour un animal
    @Patch(':id')
    async updateAnimal(@Param('id') id: string, @Body() updateData: Partial<CreateAnimalDto>) {
        this.logger.debug(`Updating animal with ID: ${id} with data: ${JSON.stringify(updateData)}`);
        const result = await this.animalService.updateAnimal(id, updateData);
        this.logger.debug(`Animal updated: ${JSON.stringify(result)}`);
        return result;
    }

    // Supprimer un animal
    @Delete(':id')
    async deleteAnimal(@Param('id') id: string) {
        this.logger.debug(`Deleting animal with ID: ${id}`);
        const result = await this.animalService.deleteAnimal(id);
        this.logger.debug(`Animal deleted: ${JSON.stringify(result)}`);
        return result;
    }
}
