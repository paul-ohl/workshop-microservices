import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'Ok from cart service';
  }

  async getCart() {}
}
