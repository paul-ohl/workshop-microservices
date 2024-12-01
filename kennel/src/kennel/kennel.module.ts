import { Module } from '@nestjs/common';
import { KennelController } from './kennel.controller';
import { KennelService } from './kennel.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [KennelController],
  providers: [KennelService, PrismaService],
})
export class KennelModule {}
