import { Test, TestingModule } from '@nestjs/testing';
import { VetModule } from './vet.module';
import { VetService } from './vet.service';
import { VetController } from './vet.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('VetModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [VetModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have VetService', () => {
    const service = module.get<VetService>(VetService);
    expect(service).toBeDefined();
  });

  it('should have VetController', () => {
    const controller = module.get<VetController>(VetController);
    expect(controller).toBeDefined();
  });

  it('should have PrismaService', () => {
    const service = module.get<PrismaService>(PrismaService);
    expect(service).toBeDefined();
  });

  it('should have ConfigModule', () => {
    const configModule = module.get(ConfigModule);
    expect(configModule).toBeDefined();
  });
});
