import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialiser Prisma pour PostgreSQL
  const prisma = new PrismaClient();

  try {
    // Vérifie la connexion
    await prisma.$connect();
    console.log('Connexion à PostgreSQL réussie !');

    // Insertion d'un utilisateur de test
    const newUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'testpassword',
        role: 'user',
      },
    });
    console.log('Nouvel utilisateur ajouté :', newUser);
  } catch (error) {
    console.error(
      "Erreur lors de la connexion ou de l'insertion dans PostgreSQL :",
      error,
    );
  } finally {
    await prisma.$disconnect();
  }

  await app.listen(3000);
}
bootstrap();
