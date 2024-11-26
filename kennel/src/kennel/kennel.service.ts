import { Injectable } from '@nestjs/common';
import { Kennel, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KennelService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.kennel.findMany();
  }

  async findKennelById(
    kennelWhereUniqueInput: Prisma.KennelWhereUniqueInput,
  ): Promise<Kennel | null> {
    return this.prisma.kennel.findUnique({
      where: kennelWhereUniqueInput,
    });
  }

  async createKennel(data: Prisma.KennelCreateInput): Promise<Kennel> {
    return this.prisma.kennel.create({
      data,
    });
  }

  async updateKennel(params: {
    where: Prisma.KennelWhereUniqueInput;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { where, data } = params;
    return this.prisma.kennel.update({
      data,
      where,
    });
  }

  async deleteKennel(where: Prisma.KennelWhereUniqueInput): Promise<Kennel> {
    return this.prisma.kennel.delete({
      where,
    });
  }

  async addProduct(params: {
    where: Prisma.KennelWhereUniqueInput;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { where, data } = params;
    return this.prisma.kennel.update({
      data,
      where,
    });
  }

  async addVet(params: {
    where: Prisma.KennelWhereUniqueInput;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { where, data } = params;
    return this.prisma.kennel.update({
      data,
      where,
    });
  }

  async addAnimal(params: {
    where: Prisma.KennelWhereUniqueInput;
    data: Prisma.KennelUpdateInput;
  }): Promise<Kennel> {
    const { where, data } = params;
    return this.prisma.kennel.update({
      data,
      where,
    });
  }
}
