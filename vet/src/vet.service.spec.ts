import { Test, TestingModule } from '@nestjs/testing';
import { VetService } from './vet.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('VetService', () => {
  let service: VetService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VetService,
        {
          provide: PrismaService,
          useValue: {
            vet: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VetService>(VetService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createVet', () => {
    it('should create a new vet', async () => {
      const body = {
        name: 'Test Vet',
        price: 100,
        categoryIds: ['cat1'],
        disponibility: [
          {
            day: 'Monday',
            timeSlot: [
              {
                startTime: '2023-01-01T08:00:00Z',
                endTime: '2023-01-01T12:00:00Z',
                isDisponible: true,
              },
            ],
          },
        ],
      };
      const newVet = { id: '1', ...body };
      jest.spyOn(prisma.vet, 'create').mockResolvedValue(newVet);

      expect(await service.createVet(body)).toBe(newVet);
    });

    it('should throw an InternalServerErrorException if creation fails', async () => {
      const body = {
        name: 'Test Vet',
        price: 100,
        categoryIds: ['cat1'],
        disponibility: [
          {
            day: 'Monday',
            timeSlot: [
              {
                startTime: '2023-01-01T08:00:00Z',
                endTime: '2023-01-01T12:00:00Z',
                isDisponible: true,
              },
            ],
          },
        ],
      };
      jest.spyOn(prisma.vet, 'create').mockResolvedValue(null);

      await expect(service.createVet(body)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of vets', async () => {
      const result = [];
      jest.spyOn(prisma.vet, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findVetInfos', () => {
    it('should return a single vet', async () => {
      const vet = {
        id: '1',
        name: 'Test Vet',
        price: 100,
        categoryIds: ['cat', 'dog'],
      };
      jest.spyOn(prisma.vet, 'findUnique').mockResolvedValue(vet);

      expect(await service.findVetInfos('1')).toBe(vet);
    });

    it('should throw a NotFoundException if vet is not found', async () => {
      jest.spyOn(prisma.vet, 'findUnique').mockResolvedValue(null);

      await expect(service.findVetInfos('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findVetByCategories', () => {
    it('should return an array of vets by categories', async () => {
      const result = [];
      jest.spyOn(prisma.vet, 'findMany').mockResolvedValue(result);

      expect(await service.findVetByCategories(['cat1', 'cat2'])).toBe(result);
    });
  });

  describe('updateVet', () => {
    it('should update a vet', async () => {
      const vet = {
        id: '1',
        name: 'Updated Vet',
        price: 100,
        categoryIds: ['cat', 'dog'],
      };
      jest.spyOn(prisma.vet, 'update').mockResolvedValue(vet);

      expect(await service.updateVet('1', { name: 'Updated Vet' })).toBe(vet);
    });

    it('should throw a NotFoundException if vet is not found', async () => {
      jest.spyOn(prisma.vet, 'update').mockResolvedValue(null);

      await expect(
        service.updateVet('1', { name: 'Updated Vet' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteVet', () => {
    it('should delete a vet', async () => {
      const vet = {
        id: '1',
        name: 'Updated Vet',
        price: 100,
        categoryIds: ['cat', 'dog'],
      };
      jest.spyOn(prisma.vet, 'delete').mockResolvedValue(vet);

      expect(await service.deleteVet('1')).toBe(vet);
    });

    it('should throw a NotFoundException if vet is not found', async () => {
      jest.spyOn(prisma.vet, 'delete').mockResolvedValue(null);

      await expect(service.deleteVet('1')).rejects.toThrow(NotFoundException);
    });
  });
});
