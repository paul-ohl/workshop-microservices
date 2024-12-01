import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const returnJson = JSON.stringify({
    sessionId: '1234',
    sessionUrl: 'http://example.com',
  });

  const mockAppService = {
    getHello: jest.fn(() => 'OK from Payment microservice'),
    payCart: jest.fn(async () => {
      return returnJson;
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).overrideProvider(AppService).useValue(mockAppService).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return OK', () => {
      expect(appController.getHello()).toBe('OK from Payment microservice');
      expect(mockAppService.getHello).toHaveBeenCalled();
    });
    it('should call payCart function', async () => {
      const payCartDto = { id: 1, items: [], ownerId: 'abcd' };
      const res = await appController.payCart(payCartDto);
      expect(res).toBe(returnJson);
      expect(mockAppService.payCart).toHaveBeenCalledWith(payCartDto);
    });
  });
});
