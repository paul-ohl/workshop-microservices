import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('generate')
  async generateToken(@Body() payload: any) {
    try {
      const token = this.authService.generateToken(payload.payload); // Remarquez payload.payload
      return { token };
    } catch (error) {
      throw new HttpException(
        'Failed to generate token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
