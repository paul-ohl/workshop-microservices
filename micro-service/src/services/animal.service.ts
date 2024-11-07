import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schema/animal.schema';
import { Category } from '../schema/category.schema';
import { CreateAnimalDto } from '../dto/create-animal.dto';

@Injectable()
export class AnimalService {
    constructor(
        @InjectModel(Animal.name) private animalModel: Model<Animal>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) { }

    async createAnimal(createAnimalDto: CreateAnimalDto) {
        const { name, age, categoryId, gender } = createAnimalDto;

        if (gender !== 1 && gender !== 2) {
            throw new Error("Le champ 'gender' doit être 1 (mâle) ou 2 (femelle)");
        }

        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new Error("La catégorie n'existe pas");
        }

        const newAnimal = new this.animalModel({
            name,
            age,
            categoryId,
            gender,
        });
        return newAnimal.save();
    }

    async createCategory(name: string) {
        const category = new this.categoryModel({ name });
        return category.save();
    }

    // Obtenir tous les animaux
    async getAllAnimals() {
        return this.animalModel.find().populate('categoryId').exec();
    }

    // Obtenir un animal par ID
    async getAnimalById(id: string) {
        return this.animalModel.findById(id).populate('categoryId').exec();
    }

    // Mettre à jour un animal
    async updateAnimal(id: string, updateData: Partial<CreateAnimalDto>) {
        return this.animalModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    // Supprimer un animal
    async deleteAnimal(id: string) {
        return this.animalModel.findByIdAndDelete(id).exec();
    }
}