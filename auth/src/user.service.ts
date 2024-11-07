import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(email: string, password: string, role: string) {
    console.log('Débogage - Données reçues pour enregistrement:', { email, role });

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      console.log('Débogage - Mot de passe haché:', hashedPassword);

      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, role },
      });
      console.log('Débogage - Utilisateur créé avec succès:', user);
      return `Utilisateur créé: ${user.email}`;
    } catch (error) {
      console.error('Débogage - Erreur lors de la création de l’utilisateur:', error);

      if (error.code === 'P2002') { // P2002 : Contrainte unique violée
        throw new HttpException('Email déjà utilisé', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        `Erreur lors de la création de l’utilisateur: ${error.message || 'Erreur inconnue'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Email ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '10h' },
    );
    return { token };
  }

  async deleteUser(userId: string) {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
      return 'Utilisateur supprimé';
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la suppression de l’utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    userId: string,
    email?: string,
    password?: string,
    role?: string,
  ) {
    const data: { email?: string; password?: string; role?: string } = {
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      role,
    };
    try {
      await this.prisma.user.update({ where: { id: userId }, data });
      return 'Utilisateur mis à jour';
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email déjà utilisé', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Erreur lors de la mise à jour de l’utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
