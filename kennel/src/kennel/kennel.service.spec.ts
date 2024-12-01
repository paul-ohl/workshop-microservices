import { Test, TestingModule } from '@nestjs/testing';
import { KennelService } from './kennel.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Kennel } from '@prisma/client';

describe('KennelService', () => {
  let service: KennelService;

  const mockPrismaService = {
    kennel: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KennelService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<KennelService>(KennelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of kennels', async () => {
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
      mockPrismaService.kennel.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findKennelById', () => {
    it('should return a kennel by id', async () => {
      const result: Kennel = {
        id: '1',
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        animals: [],
      };
      mockPrismaService.kennel.findUnique.mockResolvedValue(result);

      expect(await service.findKennelById('1')).toBe(result);
    });

    it('should throw NotFoundException if kennel not found', async () => {
      mockPrismaService.kennel.findUnique.mockResolvedValue(null);

      try {
        await service.findKennelById('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Kennel with id 999 not found');
      }
    });
  });

  describe('createKennel', () => {
    it('should create a new kennel', async () => {
      const kennelData = {
        name: 'Kennel 1',
        address: '123 Street',
        productsId: [],
        vets: [],
        animals: [],
      };
      const result: Kennel = { id: '1', ...kennelData };

      mockPrismaService.kennel.create.mockResolvedValue(result);

      expect(await service.createKennel(kennelData)).toBe(result);
    });
  });

  describe('updateKennel', () => {
    it('should update a kennel', async () => {
      const existingKennel = {
        id: '1',
        name: 'Old Kennel',
        address: '123 Street',
      };
      const updatedKennel = {
        id: '1',
        name: 'Updated Kennel',
        address: '789 Road',
      };

      mockPrismaService.kennel.findUnique.mockResolvedValue(existingKennel);

      mockPrismaService.kennel.update.mockResolvedValue(updatedKennel);

      const result = await service.updateKennel({
        id: '1',
        data: { name: 'Updated Kennel', address: '789 Road' },
      });
      expect(result).toEqual(updatedKennel);
    });

    it('should throw NotFoundException if kennel not found', async () => {
      mockPrismaService.kennel.findUnique.mockResolvedValue(null);

      try {
        await service.updateKennel({
          id: '999',
          data: { name: 'Updated Kennel' },
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Kennel with id 999 not found');
      }
    });
  });

  describe('deleteKennel', () => {
    it('should delete a kennel', async () => {
      const existingKennel = {
        id: '1',
        name: 'Old Kennel',
        address: '123 Street',
      };
      const deletedKennel = {
        id: '1',
        name: 'Deleted Kennel',
        address: '789 Road',
      };

      mockPrismaService.kennel.findUnique.mockResolvedValue(existingKennel);

      mockPrismaService.kennel.delete.mockResolvedValue(deletedKennel);

      const result = await service.deleteKennel('1');
      expect(result).toEqual(deletedKennel);
    });

    it('should throw NotFoundException if kennel not found', async () => {
      mockPrismaService.kennel.findUnique.mockResolvedValue(null);

      try {
        await service.deleteKennel('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Kennel with id 999 not found');
      }
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

      mockPrismaService.kennel.update.mockResolvedValue(result);

      expect(
        await service.addProduct({
          id: '1',
          data: { productsId: ['prod1', 'prod2'] },
        }),
      ).toBe(result);
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

      mockPrismaService.kennel.update.mockResolvedValue(result);

      expect(
        await service.addVet({ id: '1', data: { vets: ['vet1', 'vet2'] } }),
      ).toBe(result);
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

      mockPrismaService.kennel.update.mockResolvedValue(result);

      expect(
        await service.addAnimal({
          id: '1',
          data: { animals: ['dog1', 'cat1'] },
        }),
      ).toBe(result);
    });
  });
});
