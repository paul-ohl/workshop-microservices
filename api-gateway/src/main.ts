import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connecte l'API Gateway au microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,  // Port du microservice
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);  // Port de l'API Gateway
}
bootstrap();
