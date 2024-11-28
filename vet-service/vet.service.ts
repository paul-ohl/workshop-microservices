import { Injectable } from '@nestjs/common';

@Injectable()
export class VetService {
  constructor() {}

  public async logHelloWorld() {
    return 'Hello World';
  }
}
