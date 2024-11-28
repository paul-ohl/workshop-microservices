import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

function checkEnvVars() {
  if (!process.env.PAYMENT_SERVICE_HOST) {
    throw new Error('PAYMENT_SERVICE_HOST is not defined');
  }
  if (!process.env.PORT) {
    throw new Error('PORT is not defined');
  }
}

async function bootstrap() {
  checkEnvVars();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cart API')
    .setDescription('The Cart API description for the cart microservice')
    .setVersion('1.0')
    .addTag('cart')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
