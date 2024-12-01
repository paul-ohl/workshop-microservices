import { Test, TestingModule } from '@nestjs/testing';
import { KennelController } from './kennel.controller';
import { KennelService } from './kennel.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Kennel } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('KennelController', () => {
  let controller: KennelController;

  const mockKennelService = {
    findAll: jest.fn(),
    findKennelById: jest.fn(),
    createKennel: jest.fn(),
    updateKennel: jest.fn(),
    deleteKennel: jest.fn(),
    addProduct: jest.fn(),
    addVet: jest.fn(),
    addAnimal: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KennelController],
      providers: [KennelService, PrismaService],
    })
      .overrideProvider(KennelService)
      .useValue(mockKennelService)
      .compile();

    controller = module.get<KennelController>(KennelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllKennels', () => {
    it('should return an array of kennels', async () => {
      const result: Kennel[] = [
        {
          id: '1',
          name: 'Kennel 1',
          address: '123 Street',
          productsId: [],
          vets: [],
          animals: [],
        },
        {
          id: '2',
          name: 'Kennel 2',
          address: '456 Avenue',
          productsId: [],
          vets: [],
          animals: [],
        },
      ];
      mockKennelService.findAll.mockResolvedValue(result);

      expect(await controller.getAllKennels()).toBe(result);
    });
  });

  describe('getKennelById', () => {
    it('should return a kennel by id', async () => {
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        animals: [],
      };
      mockKennelService.findKennelById.mockResolvedValue(result);

      expect(await controller.getKennelById('1')).toBe(result);
    });

    it('should throw NotFoundException if kennel not found', async () => {
      mockKennelService.findKennelById.mockResolvedValue(null);

      try {
        await controller.getKennelById('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Kennel with ID 999 not found');
      }
    });
  });

  describe('createNewKennel', () => {
    it('should create a new kennel', async () => {
      const kennelData = {
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        animals: [],
      };
      const result: Kennel = { id: '1', ...kennelData };

      mockKennelService.createKennel.mockResolvedValue(result);

      expect(await controller.createNewKennel(kennelData)).toBe(result);
    });
  });

  describe('updateKennel', () => {
    it('should update a kennel', async () => {
      const kennelData = {
        name: 'Updated Kennel',
        address: '789 Road',
        productsId: [],
        vets: [],
        animals: [],
      };
      const result: Kennel = { id: '1', ...kennelData };

      mockKennelService.updateKennel.mockResolvedValue(result);

      expect(await controller.updateKennel('1', kennelData)).toBe(result);
    });
  });

  describe('deleteKennel', () => {
    it('should delete a kennel', async () => {
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        animals: [],
      };

      mockKennelService.deleteKennel.mockResolvedValue(result);

      expect(await controller.deleteKennel('1')).toBe(result);
    });
  });

  describe('addProduct', () => {
    it('should add product to a kennel', async () => {
      const kennelData = { productsId: ['prod1', 'prod2'] };
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        ...kennelData,
        vets: [],
        animals: [],
      };

      mockKennelService.addProduct.mockResolvedValue(result);

      expect(await controller.addProduct('1', kennelData)).toBe(result);
    });
  });

  describe('addVet', () => {
    it('should add vet to a kennel', async () => {
      const kennelData = { vets: ['vet1', 'vet2'] };
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        ...kennelData,
        animals: [],
      };

      mockKennelService.addVet.mockResolvedValue(result);

      expect(await controller.addVet('1', kennelData)).toBe(result);
    });
  });

  describe('addAnimal', () => {
    it('should add animal to a kennel', async () => {
      const kennelData = { animals: ['dog1', 'cat1'] };
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        ...kennelData,
      };

      mockKennelService.addAnimal.mockResolvedValue(result);

      expect(await controller.addAnimal('1', kennelData)).toBe(result);
    });
  });
});
