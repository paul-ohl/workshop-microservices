import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KennelService } from './kennel.service';
import { ProductService } from './product.service';

@Module({
  imports: [KennelService, ProductService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
