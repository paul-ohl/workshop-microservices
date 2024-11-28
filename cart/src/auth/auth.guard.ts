import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.log('No token found in the request');
      throw new UnauthorizedException();
    }
    try {
      const jwtSecret = process.env.JWT_SECRET ?? 'secret';
      this.logger.debug('Verifying token against secret: ', jwtSecret);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      this.logger.log('Token verification failed: Dit not match secret');
      throw new UnauthorizedException();
    }
    this.logger.debug(
      'Successfully authenticated request for user: ',
      request['user'].sub,
    );
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
