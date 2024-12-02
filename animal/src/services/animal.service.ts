import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schema/animal.schema';
import { Category } from '../schema/category.schema';
import { CreateAnimalDto } from '../dto/create-animal.dto';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);

  constructor(
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  // Créer un animal
  async createAnimal(createAnimalDto: CreateAnimalDto) {
    this.logger.debug(
      `Creating animal with data: ${JSON.stringify(createAnimalDto)}`,
    );
    const { name, age, categoryId, gender } = createAnimalDto;

    if (gender !== 1 && gender !== 2) {
      this.logger.error(`Invalid gender: ${gender}`);
      throw new BadRequestException(
        "Le champ 'gender' doit être 1 (mâle) ou 2 (femelle)",
      );
    }

    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      this.logger.error(`Category not found with ID: ${categoryId}`);
      throw new NotFoundException("La catégorie n'existe pas");
    }

    const newAnimal = new this.animalModel({
      name,
      age,
      categoryId,
      gender,
    });

    const result = await newAnimal.save();
    this.logger.debug(`Animal created successfully: ${JSON.stringify(result)}`);
    return result;
  }

  // Créer une catégorie
  async createCategory(name: string) {
    this.logger.debug(`Creating category with name: ${name}`);
    const existingCategory = await this.categoryModel.findOne({ name });
    if (existingCategory) {
      this.logger.error(`Category already exists with name: ${name}`);
      throw new BadRequestException('Cette catégorie existe déjà');
    }

    const category = new this.categoryModel({ name });
    const result = await category.save();
    this.logger.debug(
      `Category created successfully: ${JSON.stringify(result)}`,
    );
    return result;
  }

  // Obtenir tous les animaux
  async getAllAnimals() {
    this.logger.debug('Fetching all animals');
    const result = await this.animalModel.find().populate('categoryId').exec();
    this.logger.debug(`Fetched animals: ${JSON.stringify(result)}`);
    return result;
  }

  // Obtenir un animal par ID
  async getAnimalById(id: string) {
    this.logger.debug(`Fetching animal by ID: ${id}`);
    const animal = await this.animalModel
      .findById(id)
      .populate('categoryId')
      .exec();
    if (!animal) {
      this.logger.error(`Animal not found with ID: ${id}`);
      throw new NotFoundException("L'animal n'existe pas");
    }
    this.logger.debug(`Animal fetched successfully: ${JSON.stringify(animal)}`);
    return animal;
  }

  // Mettre à jour un animal
  async updateAnimal(id: string, updateData: Partial<CreateAnimalDto>) {
    this.logger.debug(
      `Updating animal with ID: ${id} with data: ${JSON.stringify(updateData)}`,
    );
    const updatedAnimal = await this.animalModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedAnimal) {
      this.logger.error(`Animal not found with ID: ${id} for update`);
      throw new NotFoundException("L'animal n'existe pas");
    }
    this.logger.debug(
      `Animal updated successfully: ${JSON.stringify(updatedAnimal)}`,
    );
    return updatedAnimal;
  }

  // Supprimer un animal
  async deleteAnimal(id: string) {
    this.logger.debug(`Deleting animal with ID: ${id}`);
    const deletedAnimal = await this.animalModel.findByIdAndDelete(id).exec();
    if (!deletedAnimal) {
      this.logger.error(`Animal not found with ID: ${id} for deletion`);
      throw new NotFoundException("L'animal n'existe pas");
    }
    this.logger.debug(
      `Animal deleted successfully: ${JSON.stringify(deletedAnimal)}`,
    );
    return deletedAnimal;
  }
}
