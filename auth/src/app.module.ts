import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
