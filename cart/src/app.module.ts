import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './item/item.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [CartModule, ItemModule, PrometheusModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
