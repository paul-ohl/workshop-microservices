import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Bootstrap');

function checkEnvVars() {
  const requiredEnvVars = [
    'VET_SERVICE_URL',
    'CART_SERVICE_URL',
    'AUTH_SERVICE_URL',
    'KENNEL_SERVICE_URL',
    'ANIMAL_SERVICE_URL',
  ];
  let shouldExit = false;
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      logger.error(`Environment variable ${envVar} is missing`);
      shouldExit = true;
    }
  });
  if (shouldExit) {
    process.exit(1);
  }
}

async function bootstrap() {
  checkEnvVars();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('The Gateway API description for the gateway microservice')
    .setVersion('1.0')
    .addTag('gateway')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
  logger.log('API Gateway is running on http://localhost:3000');
}

bootstrap();
