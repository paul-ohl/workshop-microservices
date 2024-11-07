import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private prisma: PrismaClient;

  getHealth(): string {
    return 'Ok from cart service';
  }

  async getCart() {}
}
