import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KennelService } from './kennel.service';
import { ProductService } from './product.service';
import { PrismaModule } from 'prisma/prisma.module';
import { KennelModule } from './kennel.module';
import { ProductModule } from './product.module';

@Module({
  imports: [PrismaModule, KennelModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
