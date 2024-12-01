import { VetController } from './vet.controller';
import { VetService } from './vet.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Day } from '@prisma/client';
import { createVetDto } from 'src/dto/createVet.dto';
import { updateVetDto } from 'src/dto/updateVet.dto';

describe('VetController', () => {
  let controller: VetController;
  let service: VetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VetController],
      providers: [
        {
          provide: VetService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findVetInfos: jest.fn().mockResolvedValue({}),
            findVetByCategories: jest.fn().mockResolvedValue([]),
            createVet: jest.fn().mockResolvedValue({}),
            updateVet: jest.fn().mockResolvedValue({}),
            deleteVet: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<VetController>(VetController);
    service = module.get<VetService>(VetService);
  });

  describe('findAll', () => {
    it('should return an array of vets', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findVet', () => {
    it('should return a single vet', async () => {
      const result = {
        id: 'c500900e-f6e0-48f8-a300-01644b69f0c0',
        name: 'Dr. Jane Doe',
        price: 80,
        categoryIds: ['cat', 'dog'],
        disponibility: [
          {
            id: 'fccb50a0-4604-459e-a6e2-018dfbf16ce5',
            day: [Day.LUNDI, Day.MARDI],
            vetId: 'c500900e-f6e0-48f8-a300-01644b69f0c0',
            timeSlot: [
              {
                id: 'b4c998eb-86e5-471c-9de3-b295fbc65b81',
                startTime: new Date('2024-12-01T08:00:00.000Z'),
                endTime: new Date('2024-12-01T12:00:00.000Z'),
                disponibilityId: 'fccb50a0-4604-459e-a6e2-018dfbf16ce5',
                isDisponible: true,
              },
              {
                id: 'ab73a12e-920d-4ed2-b99b-fba6c50100c1',
                startTime: new Date('2024-12-01T13:00:00.000Z'),
                endTime: new Date('2024-12-01T17:00:00.000Z'),
                disponibilityId: 'fccb50a0-4604-459e-a6e2-018dfbf16ce5',
                isDisponible: true,
              },
            ],
          },
          {
            id: 'ff185463-dce1-4805-9e26-5dd3dc040546',
            day: [Day.MERCREDI],
            vetId: 'c500900e-f6e0-48f8-a300-01644b69f0c0',
            timeSlot: [
              {
                id: '4ed8cda9-2c40-4a84-82ce-05cd69e5ee21',
                startTime: new Date('2024-12-01T09:00:00.000Z'),
                endTime: new Date('2024-12-01T12:00:00.000Z'),
                disponibilityId: 'ff185463-dce1-4805-9e26-5dd3dc040546',
                isDisponible: true,
              },
            ],
          },
        ],
      };

      jest.spyOn(service, 'findVetInfos').mockResolvedValue(result);

      expect(await controller.findVet('1')).toBe(result);
    });
  });

  describe('findVetByCategories', () => {
    it('should return an array of vets by categories', async () => {
      const result = [];
      jest.spyOn(service, 'findVetByCategories').mockResolvedValue(result);
      expect(await controller.findVetByCategories('cat1,cat2')).toBe(result);
    });
  });

  describe('createVet', () => {
    it('should create a new vet', async () => {
      const result = {
        id: '1',
        name: 'Dr. Jane Doe',
        price: 80,
        categoryIds: ['cat', 'dog'],
        disponibility: [
          {
            id: '1',
            day: [Day.LUNDI, Day.MARDI],
            vetId: '1',
            timeSlot: [
              {
                id: '1',
                startTime: new Date('2024-12-01T08:00:00.000Z'),
                endTime: new Date('2024-12-01T12:00:00.000Z'),
                isDisponible: true,
              },
              {
                id: '2',
                startTime: new Date('2024-12-01T13:00:00.000Z'),
                endTime: new Date('2024-12-01T17:00:00.000Z'),
                isDisponible: true,
              },
            ],
          },
          {
            id: '2',
            day: [Day.MERCREDI],
            vetId: '1',
            timeSlot: [
              {
                id: '3',
                startTime: new Date('2024-12-01T09:00:00.000Z'),
                endTime: new Date('2024-12-01T12:00:00.000Z'),
                isDisponible: true,
              },
            ],
          },
        ],
      };

      const dto: createVetDto = {
        name: 'Dr. Jane Doe',
        price: 80,
        categoryIds: ['cat', 'dog'],
        disponibility: [
          {
            id: '1',
            day: [Day.LUNDI, Day.MARDI],
            vetId: '1',
          },
          {
            id: '2',
            day: [Day.MERCREDI],
            vetId: '1',
          },
        ],
      };

      jest.spyOn(service, 'createVet').mockResolvedValue(result);

      expect(await controller.createVet(dto)).toBe(result);
    });
  });

  describe('updateVet', () => {
    it('should update a vet', async () => {
      const result = {
        id: '1',
        name: 'Updated Vet',
        price: 150,
        categoryIds: ['cat1'],
      };

      const dto: updateVetDto = {
        name: 'Updated Vet',
        price: 150,
        categoryIds: ['cat1'],
      };

      jest.spyOn(service, 'updateVet').mockResolvedValue(result);

      expect(await controller.updateVet('1', dto)).toBe(result);
    });
  });

  describe('deleteVet', () => {
    it('should delete a vet', async () => {
      const result = {
        id: '1',
        name: 'Test Vet',
        price: 100,
        categoryIds: ['cat1'],
      };

      jest.spyOn(service, 'deleteVet').mockResolvedValue(result);

      expect(await controller.deleteVet('1')).toBe(result);
    });
  });
});
