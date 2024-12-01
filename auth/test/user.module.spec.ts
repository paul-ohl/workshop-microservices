import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../src/user.module';

describe('UserModule', () => {
  it('should load UserModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
