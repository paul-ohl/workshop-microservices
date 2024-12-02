import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FetcherService {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://' + url),
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching data:', error.message);
      throw new HttpException(
        error.response?.data || 'Error while fetching data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async post(url: string, data: any): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://' + url, data),
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching data:', error.message);
      throw new HttpException(
        error.response?.data || 'Error while fetching data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async patch(url: string, data: any): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch('http://' + url, data),
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching data:', error.message);
      throw new HttpException(
        error.response?.data || 'Error while fetching data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async put(url: string, data: any): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.put('http://' + url, data),
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching data:', error.message);
      throw new HttpException(
        error.response?.data || 'Error while fetching data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(url: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete('http://' + url),
      );
      return response.data;
    } catch (error) {
      console.error('Error while fetching data:', error.message);
      throw new HttpException(
        error.response?.data || 'Error while fetching data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
