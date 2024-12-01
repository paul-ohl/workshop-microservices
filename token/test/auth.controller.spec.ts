import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth.controller';
import { AuthService } from '../src/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('generateToken', () => {
it('should return a generated token', async () => {
  const payload = { id: 1, email: 'test@example.com' };
  mockAuthService.generateToken.mockReturnValue('mockedToken');

  const result = await controller.generateToken({ payload });

  expect(result).toEqual({ token: 'mockedToken' });
  expect(mockAuthService.generateToken).toHaveBeenCalledWith(payload);
});


    it('should throw an error if token generation fails', async () => {
      mockAuthService.generateToken.mockImplementation(() => {
        throw new Error('Token generation failed');
      });

      await expect(controller.generateToken({ payload: {} })).rejects.toThrow(
        'Failed to generate token',
      );
    });
  });
});
