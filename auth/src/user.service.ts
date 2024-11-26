import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  private privateKey: string;

  constructor(private prisma: PrismaService) {
    this.privateKey = process.env.JWT_SECRET as string;
  }

  async registerUser(email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, role },
      });
      return `Utilisateur créé: ${user.email}`;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Email déjà utilisé', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Erreur lors de la création de l’utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(email: string, password: string) {
    // Recherche de l'utilisateur par email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Email ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Signature du token avec la clé privée RSA et l'algorithme RS256
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.privateKey,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );

    return { token, id: user.id };
  }

  async deleteUser(userId: number) {
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
    userId: number,
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
