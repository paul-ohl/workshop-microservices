import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VetService {
  constructor(private prisma: PrismaService) {}

  public async createVet(body) {
    const { name, price, categoryIds, disponibility } = body;

    const newVet = await this.prisma.vet.create({
      data: {
        name,
        price,
        categoryIds,
        disponibility: {
          create: disponibility.map((dispo) => ({
            day: dispo.day,
            timeSlot: {
              create: dispo.timeSlot.map((slot) => ({
                startTime: new Date(slot.startTime),
                endTime: new Date(slot.endTime),
                isDisponible: slot.isDisponible,
              })),
            },
          })),
        },
      },
    });

    if (!newVet)
      throw new InternalServerErrorException(
        'An error occurred while creating the vet',
      );

    return newVet;
  }

  public async findAll() {
    const vets = await this.prisma.vet.findMany({
      include: {
        disponibility: {
          include: {
            timeSlot: true,
          },
        },
      },
    });

    return vets;
  }

  public async findVetInfos(id: string) {
    const vet = await this.prisma.vet.findUnique({
      where: { id },
      include: {
        disponibility: {
          include: {
            timeSlot: {
              orderBy: {
                startTime: 'asc',
              },
            },
          },
        },
      },
    });

    if (!vet) throw new NotFoundException(`Vet with id ${id} not found`);

    return vet;
  }

  public async findVetByCategories(categories: string[]) {
    const vets = await this.prisma.vet.findMany({
      where: {
        categoryIds: {
          hasSome: categories,
        },
      },
    });

    return vets;
  }

  public async updateVet(id: string, data: any) {
    const vet = await this.prisma.vet.update({
      where: { id },
      data,
    });

    if (!vet) throw new NotFoundException(`Vet with id ${id} not found`);

    return vet;
  }

  async deleteVet(id: string) {
    const vet = await this.prisma.vet.delete({ where: { id } });

    if (!vet) throw new NotFoundException(`Vet with id ${id} not found`);

    return vet;
  }
}
