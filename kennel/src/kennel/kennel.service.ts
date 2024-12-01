import { Injectable, NotFoundException } from '@nestjs/common';
import { Kennel, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KennelService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.kennel.findMany();
  }

  async findKennelById(id: string): Promise<Kennel | null> {
    const kennel = this.prisma.kennel.findUnique({
      where: { id },
    });

    if (!kennel) throw new NotFoundException(`Kennel with id ${id} not found`);

    return kennel;
  }

  async createKennel(data: Prisma.KennelCreateInput): Promise<Kennel> {
    return this.prisma.kennel.create({
      data,
    });
  }

  async updateKennel(params: {
    id: string;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { id, data } = params;

    const kennelExists = await this.prisma.kennel.findUnique({
      where: { id },
    });

    if (!kennelExists) {
      throw new NotFoundException(`Kennel with id ${id} not found`);
    }

    return this.prisma.kennel.update({
      where: { id },
      data,
    });
  }

  async deleteKennel(id: string): Promise<Kennel> {
    const kennelExists = await this.prisma.kennel.findUnique({
      where: { id },
    });

    if (!kennelExists) {
      throw new NotFoundException(`Kennel with id ${id} not found`);
    }

    return this.prisma.kennel.delete({
      where: { id },
    });
  }

  async addProduct(params: {
    id: string;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { id, data } = params;
    return this.prisma.kennel.update({
      where: { id },
      data,
    });
  }

  async addVet(params: {
    id: string;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { id, data } = params;
    return this.prisma.kennel.update({
      where: { id },
      data,
    });
  }

  async addAnimal(params: {
    id: string;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { id, data } = params;
    return this.prisma.kennel.update({
      where: { id },
      data,
    });
  }
}
