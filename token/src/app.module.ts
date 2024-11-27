import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  exports: [AuthService],
})
export class AppModule {}
