import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  logger.log('API Gateway is running on http://localhost:3000');

  const httpService = app.get(HttpService); 
  const animalServiceUrl = 'http://animal:3001'; 


}

bootstrap();
