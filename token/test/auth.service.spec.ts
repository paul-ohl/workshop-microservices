import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth.service';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('generateToken', () => {
jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options) => {
  if (!secret) {
    throw new Error('Missing secret');
  }
  return 'mockedToken';
});

it('should generate a valid token', () => {
  const payload = { id: 1, email: 'test@example.com' };
  process.env.JWT_SECRET = 'mockSecret'; // Simulez la clé secrète
  const token = service.generateToken(payload);

  expect(token).toBe('mockedToken');
  expect(jwt.sign).toHaveBeenCalledWith(payload, 'mockSecret', {
    expiresIn: '1h',
  });
});



    it('should throw an error if token generation fails', () => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        throw new Error('Token generation failed');
      });

      expect(() => service.generateToken({})).toThrow(
        'Token generation failed',
      );
    });
  });
});
