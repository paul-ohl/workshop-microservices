import { Module } from '@nestjs/common';
import { VetModule } from './vet.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, VetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
