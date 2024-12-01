import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';

describe('AppService', () => {
  let service: AppService;

  const mockStripeService = {
    stripeInstance: {
      checkout: {
        sessions: {
          create: jest.fn(() => {
            return {
              id: '1234',
              url: 'http://example.com',
            };
          }),
        },
      }
    }
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, StripeService],
    }).overrideProvider(StripeService).useValue(mockStripeService).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return OK', () => {
    expect(service.getHello()).toBe('OK from Payment microservice');
  });

  it('should call payCart function', async () => {
    const payCartDto = { id: 1, items: [], ownerId: 'abcd' };
    const res = await service.payCart(payCartDto);
    expect(res).toBe(JSON.stringify({
      sessionId: '1234',
      sessionUrl: 'http://example.com',
    }));
    expect(mockStripeService.stripeInstance.checkout.sessions.create).toHaveBeenCalled();
  });
});
