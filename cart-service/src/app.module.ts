import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CartModule, ItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
