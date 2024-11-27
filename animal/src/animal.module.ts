import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalService } from './services/animal.service';
import { AnimalController } from './animal.controller';
import { Animal, AnimalSchema } from './schema/animal.schema';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Animal.name, schema: AnimalSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [AnimalController],
    providers: [AnimalService],
})
export class AnimalModule { }
