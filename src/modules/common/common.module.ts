import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { LoggerService, PrismaService, configProvider } from './provider';

@Module({
  imports: [TerminusModule],
  providers: [configProvider, LoggerService, LogInterceptor, PrismaService],
  exports: [configProvider, LoggerService, LogInterceptor, PrismaService],
  controllers: [HealthController],
})
export class CommonModule {}
