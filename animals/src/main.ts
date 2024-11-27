import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Cart API')
        .setDescription('The Cart API description for the cart microservice')
        .setVersion('1.0')
        .addTag('cart')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    //  microservice
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 3001,
        },
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.startAllMicroservices();
    await app.listen(3000); 
}
bootstrap();
