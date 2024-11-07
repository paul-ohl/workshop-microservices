import { Module } from '@nestjs/common';
import { KennelController } from './kennel.controller';
import { KennelService } from './kennel.service';

@Module({
  controllers: [KennelController],
  providers: [KennelService],
})
export class KennelModule {}
