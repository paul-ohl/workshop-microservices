import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async userRegister(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const message = await this.userService.registerUser(
        email,
        password,
        role,
      );
      res.status(HttpStatus.CREATED).json({ message });
    } catch (error) {
      res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { token } = await this.userService.loginUser(email, password);
      res.status(HttpStatus.OK).json({ message: 'Connexion réussie', token });
    } catch (error) {
      res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Delete(':user_id')
  async userDelete(
    @Param('user_id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const message = await this.userService.deleteUser(userId);
      res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Put(':user_id')
  async userPut(
    @Param('user_id') userId: number,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const message = await this.userService.updateUser(
        userId,
        email,
        password,
        role,
      );
      res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
