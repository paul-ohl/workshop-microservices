import { NestFactory } from '@nestjs/core';
import { VetModule } from './vet.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(VetModule);
  const config = new DocumentBuilder()
    .setTitle('Vet API')
    .setDescription('The Vet API description for the vet microservice')
    .setVersion('1.0')
    .addTag('vet')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('vetApi', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
