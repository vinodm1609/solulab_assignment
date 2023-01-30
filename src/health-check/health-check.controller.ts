import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from '../decorators/public.decorator';

@Public()
@SkipThrottle()
@Controller('health-check')
export class HealthCheckController {
  private readonly logger = new Logger(HealthCheckController.name);
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth() {
    const healthCheck = await this.healthCheckService.check([
      () => this.http.pingCheck('Basic Check', process.env.PORT),
      () => this.db.pingCheck('mongoose'),
    ]);
    this.logger.debug(`This is health ${healthCheck}`);
    return healthCheck;
  }
}
