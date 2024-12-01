import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { KennelModule } from './kennel/kennel.module';
import { ProductModule } from './product/product.module';
import { KennelService } from './kennel/kennel.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [PrismaModule, KennelModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, KennelService, ProductService],
})
export class AppModule {}
