import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CartController } from './cart/cart.controller';
import { FetcherService } from './fetcher/fetcher.service';
import { ItemController } from './cart/item.controller';
import { UserController } from './user/user.controller';
import { KennelController } from './kennel/kennel.controller';
import { ProductController } from './kennel/product.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    CartController,
    ItemController,
    UserController,
    KennelController,
    ProductController,
  ],
  providers: [AppService, FetcherService],
})
export class AppModule {}
