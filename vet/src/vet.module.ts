import { Module } from '@nestjs/common';
import { VetService } from './vet.service';
import { VetController } from './vet.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [VetController],
  providers: [VetService, PrismaService],
})
export class VetModule {}
