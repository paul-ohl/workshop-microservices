import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-token')
  async verifyToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const result = await this.authService.verifyTokenService(req);

    if (result.status === 200) {
      res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  }

  @Get('verify-user-token')
  async verifyUserToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authService.verifyUserTokenService(req);

    if (result.status === 200) {
      res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  }
}
