import { Test, TestingModule } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import { AnimalService } from './services/animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Document } from 'mongoose';

describe('AnimalController', () => {
  let controller: AnimalController;
  let service: AnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [
        {
          provide: AnimalService,
          useValue: {
            createAnimal: jest.fn(),
            createCategory: jest.fn(),
            getAllAnimals: jest.fn(),
            getAnimalById: jest.fn(),
            updateAnimal: jest.fn(),
            deleteAnimal: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
    service = module.get<AnimalService>(AnimalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAnimal', () => {
    it('should call service.createAnimal and return the result', async () => {
      const createAnimalDto: CreateAnimalDto = {
        name: 'Tiger',
        age: 5,
        categoryId: 'cat123',
        gender: 1,
      };

      const result = {
        _id: 'animal123',
        name: 'Tiger',
        age: 5,
        categoryId: 'cat123',
        gender: 1,
      } as Partial<Document> as any;

      jest.spyOn(service, 'createAnimal').mockResolvedValue(result);

      expect(await controller.createAnimal(createAnimalDto)).toEqual(result);
      expect(service.createAnimal).toHaveBeenCalledWith(createAnimalDto);
    });
  });

  describe('createCategory', () => {
    it('should call service.createCategory and return the result', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Mammals' };
      const result = {
        _id: 'cat123',
        name: 'Mammals',
      } as Partial<Document> as any;

      jest.spyOn(service, 'createCategory').mockResolvedValue(result);

      expect(await controller.createCategory(createCategoryDto)).toEqual(
        result,
      );
      expect(service.createCategory).toHaveBeenCalledWith(
        createCategoryDto.name,
      );
    });
  });

  describe('getAllAnimals', () => {
    it('should call service.getAllAnimals and return the result', async () => {
      const result = [
        {
          _id: 'animal123',
          name: 'Tiger',
          age: 5,
          categoryId: 'cat123',
          gender: 1,
        },
      ] as Partial<Document> as any;

      jest.spyOn(service, 'getAllAnimals').mockResolvedValue(result);

      expect(await controller.getAllAnimals()).toEqual(result);
      expect(service.getAllAnimals).toHaveBeenCalled();
    });
  });

  describe('getAnimalById', () => {
    it('should call service.getAnimalById and return the result', async () => {
      const id = 'animal123';
      const result = {
        _id: id,
        name: 'Tiger',
        age: 5,
        categoryId: 'cat123',
        gender: 1,
      } as Partial<Document> as any;

      jest.spyOn(service, 'getAnimalById').mockResolvedValue(result);

      expect(await controller.getAnimalById(id)).toEqual(result);
      expect(service.getAnimalById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateAnimal', () => {
    it('should call service.updateAnimal and return the result', async () => {
      const id = 'animal123';
      const updateData = { age: 6 };
      const result = {
        _id: id,
        name: 'Tiger',
        age: 6,
        categoryId: 'cat123',
        gender: 1,
      } as Partial<Document> as any;

      jest.spyOn(service, 'updateAnimal').mockResolvedValue(result);

      expect(await controller.updateAnimal(id, updateData)).toEqual(result);
      expect(service.updateAnimal).toHaveBeenCalledWith(id, updateData);
    });
  });

  describe('deleteAnimal', () => {
    it('should call service.deleteAnimal and return the result', async () => {
      const id = 'animal123';
      const result = {
        message: 'Animal deleted successfully',
      } as Partial<Document> as any;

      jest.spyOn(service, 'deleteAnimal').mockResolvedValue(result);

      expect(await controller.deleteAnimal(id)).toEqual(result);
      expect(service.deleteAnimal).toHaveBeenCalledWith(id);
    });
  });
});
