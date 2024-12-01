import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PayCartDto } from './dtos/cart.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns OK' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/pay-cart')
  @ApiResponse({ status: 200, description: 'Payment successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async payCart(@Body() cart: PayCartDto): Promise<string> {
    return await this.appService.payCart(cart);
  }
}
