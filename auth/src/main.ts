import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialiser Prisma pour PostgreSQL
  const prisma = new PrismaClient();


  await app.listen(3000);
}
bootstrap();
