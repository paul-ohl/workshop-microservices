import { Module } from '@nestjs/common';
import { KennelController } from './kennel.controller';
import { KennelService } from './kennel.service';
import { PrismaService } from 'prisma/prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kennel } from './entities/kennel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kennel])],
  controllers: [KennelController],
  providers: [KennelService, PrismaService],
})
export class KennelModule {}
