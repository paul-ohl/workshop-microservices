import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private prisma: PrismaClient;

  getHello(): string {
    return 'Hello World!';
  }

  async getCart() {
  }
}
