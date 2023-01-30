import { Module } from '@nestjs/common';
import { HealthCheckController as HealthCheckController } from './health-check.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
