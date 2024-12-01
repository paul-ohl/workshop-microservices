import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('AnimalService', () => {
    let service: AnimalService;
    let animalModel: any;
    let categoryModel: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnimalService,
                {
                    provide: getModelToken('Animal'),
                    useValue: {
                        findById: jest.fn().mockReturnThis(),
                        find: jest.fn().mockReturnThis(),
                        findByIdAndUpdate: jest.fn().mockReturnThis(),
                        findByIdAndDelete: jest.fn().mockReturnThis(),
                        populate: jest.fn().mockReturnThis(),
                        exec: jest.fn(),
                        save: jest.fn(),
                        create: jest.fn().mockImplementation((dto) => ({
                            ...dto,
                            save: jest.fn().mockResolvedValue({ _id: '67471ad537e245d36b41c140', ...dto }),
                        })),
                    },
                },
                {
                    provide: getModelToken('Category'),
                    useValue: {
                        findById: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AnimalService>(AnimalService);
        animalModel = module.get(getModelToken('Animal'));
        categoryModel = module.get(getModelToken('Category'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createAnimal', () => {
        it('should create an animal successfully', async () => {
            const dto = { name: 'Tiger', age: 3, categoryId: '674719cb37e245d36b41c13a', gender: 1 };
            const category = { _id: '674719cb37e245d36b41c13a', name: 'Mammals' };

            jest.spyOn(categoryModel, 'findById').mockResolvedValue(category);
            jest.spyOn(animalModel, 'create').mockImplementation(() => ({
                ...dto,
                save: jest.fn().mockResolvedValue({ _id: '67471ad537e245d36b41c140', ...dto }),
            }));

            const result = await service.createAnimal(dto);
            expect(result).toEqual({ _id: '67471ad537e245d36b41c140', ...dto });
            expect(categoryModel.findById).toHaveBeenCalledWith('674719cb37e245d36b41c13a');
        });

        it('should throw an error if category is not found', async () => {
            const dto = { name: 'Tiger', age: 3, categoryId: '674719cb37e245d36b41c13a', gender: 1 };
            jest.spyOn(categoryModel, 'findById').mockResolvedValue(null);

            await expect(service.createAnimal(dto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAnimalById', () => {
        it('should return an animal', async () => {
            const id = '67471ad537e245d36b41c140';
            const animal = { _id: id, name: 'Tiger', age: 3, categoryId: '674719cb37e245d36b41c13a', gender: 1 };

            jest.spyOn(animalModel, 'findById').mockReturnThis();
            jest.spyOn(animalModel, 'populate').mockResolvedValue(animal);

            const result = await service.getAnimalById(id);
            expect(result).toEqual(animal);
            expect(animalModel.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if animal is not found', async () => {
            const id = '67471ad537e245d36b41c140';
            jest.spyOn(animalModel, 'findById').mockReturnThis();
            jest.spyOn(animalModel, 'populate').mockResolvedValue(null);

            await expect(service.getAnimalById(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('deleteAnimal', () => {
        it('should delete an animal successfully', async () => {
            const id = '67471ad537e245d36b41c140';
            const deletedAnimal = { _id: id, name: 'Tiger' };

            jest.spyOn(animalModel, 'findByIdAndDelete').mockReturnThis();
            jest.spyOn(animalModel, 'exec').mockResolvedValue(deletedAnimal);

            const result = await service.deleteAnimal(id);
            expect(result).toEqual(deletedAnimal);
            expect(animalModel.findByIdAndDelete).toHaveBeenCalledWith(id);
        });

        it('should throw an error if animal is not found', async () => {
            const id = '67471ad537e245d36b41c140';
            jest.spyOn(animalModel, 'findByIdAndDelete').mockReturnThis();
            jest.spyOn(animalModel, 'exec').mockResolvedValue(null);

            await expect(service.deleteAnimal(id)).rejects.toThrow(NotFoundException);
        });
    });
});
