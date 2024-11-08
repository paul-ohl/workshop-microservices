import { NestFactory } from '@nestjs/core';
import { AppModule } from '../micro-service/src/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 3001,     //  port du microservice
        },
    });
    await app.listen();
}
bootstrap();
