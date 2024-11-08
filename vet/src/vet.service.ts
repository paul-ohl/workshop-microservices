import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VetService {
  constructor(private prisma: PrismaService) {}

  public async createVet(data: any) {
    return this.prisma.vet.create({ data });
  }

  public async findAll() {
    const vets = await this.prisma.vet.findMany();

    return vets;
  }

  public async findVet(id: string) {
    const vet = await this.prisma.vet.findUnique({ where: { id } });

    if (!vet) throw new NotFoundException(`Vet with id ${id} not found`);

    return vet;
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
