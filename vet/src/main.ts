import { NestFactory } from '@nestjs/core';
import { VetModule } from './vet.module';

async function bootstrap() {
  const app = await NestFactory.create(VetModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
