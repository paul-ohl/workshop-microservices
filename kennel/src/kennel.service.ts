import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Kennel, Prisma } from '@prisma/client';

@Injectable()
export class KennelService {
  constructor(private prisma: PrismaService) {}

  async kennel(
    kennelWhereUniqueInput: Prisma.KennelWhereUniqueInput,
  ): Promise<Kennel | null> {
    return this.prisma.kennel.findUnique({
      where: kennelWhereUniqueInput,
    });
  }

  async kennels(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.KennelWhereUniqueInput;
    where?: Prisma.KennelWhereInput;
    orderBy?: Prisma.KennelOrderByWithRelationInput;
  }): Promise<Kennel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.kennel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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
