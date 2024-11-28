import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { VetService } from './vet.service';
import { VetController } from 'vet.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [VetController],
  providers: [VetService, PrismaService],
})
export class VetModule {}
