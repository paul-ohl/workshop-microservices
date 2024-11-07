import { Controller, Post, Body } from '@nestjs/common';
import { AnimalService } from '../services/animal.service';
import { CreateAnimalDto } from '../dto/create-animal.dto';

@Controller('animals')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) { }

    @Post()
    async create(@Body() createAnimalDto: CreateAnimalDto) {
        return this.animalService.createAnimal(createAnimalDto);
    }
}
