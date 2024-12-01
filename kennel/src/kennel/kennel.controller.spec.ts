import { Test, TestingModule } from '@nestjs/testing';
import { KennelController } from './kennel.controller';

describe('KennelController', () => {
  let controller: KennelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KennelController],
    }).compile();

    controller = module.get<KennelController>(KennelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
