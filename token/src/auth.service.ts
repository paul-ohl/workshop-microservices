import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // Corriger l'import
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export interface AuthResult {
  message?: string;
  status?: number;
  user?: JwtPayload | string;
}

@Injectable()
export class AuthService {
  private publicKey: string;

  constructor() {
    // Charger la clé publique directement depuis l'environnement
    this.publicKey = process.env.JWT_KEY as string;
  }

  async verifyTokenService(req: Request): Promise<AuthResult> {
    try {
      if (req.headers && req.headers['authorization']) {
        const token = req.headers['authorization'];

      const payload = await new Promise<JwtPayload | string>(
        (resolve, reject) => {
          jwt.verify(token, this.publicKey, (error, decoded) => {
            if (error) {
              reject(error);
            } else {
              resolve(decoded as JwtPayload | string);
            }
          });
        },
      );

        return { status: 200, user: payload, message: 'Accès autorisé' };
      } else {
        return { message: 'Accès interdit : token manquant', status: 403 };
      }
    } catch (error) {
      console.error(error);
      return { message: 'Accès interdit : token invalide', status: 403 };
    }
  }



  async verifyUserTokenService(req: Request): Promise<AuthResult> {
    try {
      if (req.headers && req.headers['authorization']) {
        const token = req.headers['authorization'];

      const payload = await new Promise<JwtPayload | string>(
        (resolve, reject) => {
          jwt.verify(token, this.publicKey, (error, decoded) => {
            if (error) {
              reject(error);
            } else {
              resolve(decoded as JwtPayload | string);
            }
          });
        },
      );

        if (
          typeof payload === 'object' &&
          'id' in payload &&
          payload.id === req.params.user_id
        ) {
          return { status: 200, user: payload, message: 'Accès autorisé' };
        } else {
          return { message: "Vous n'avez pas le bon token", status: 403 };
        }
      } else {
        return { message: 'Accès interdit : token manquant', status: 403 };
      }
    } catch (error) {
      console.error(error);
      return { message: 'Accès interdit : token invalide', status: 403 };
    }
  }
}
