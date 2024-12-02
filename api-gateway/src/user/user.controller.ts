import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { FetcherService } from 'src/fetcher/fetcher.service';

@Controller('user')
export class UserController {
  private readonly authServiceUrl = process.env.AUTH_SERVICE_URL;
  constructor(private readonly fetcher: FetcherService) { }

  @Post('register')
  async userRegister(
    @Body() body: any,
  ): Promise<string> {
    return await this.fetcher.post(`${this.authServiceUrl}/register`, body);
  }

  @Post('login')
  async userLogin(
    @Body() body: any,
  ): Promise<string> {
    return await this.fetcher.post(`${this.authServiceUrl}/login`, body);
  }

  @Delete(':user_id')
  async userDelete(
    @Param('user_id') userId: number,
  ): Promise<string> {
    return await this.fetcher.delete(`${this.authServiceUrl}/${userId}`);
  }

  @Put(':user_id')
  async userPut(
    @Param('user_id') userId: number,
    @Body() body: any,
  ): Promise<string> {
    return await this.fetcher.put(`${this.authServiceUrl}/${userId}`, body);
  }
}

