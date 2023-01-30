import {
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('AppController', () => {
  let controller: HealthCheckController;
  let healthCheckController = {
    check: jest.fn(() => {
      return 'basic check';
    }),
  };

  let mokHttp = {
    pingCheck: jest.fn(() => {
      return 'basic check';
    }),
  };

  let mokMongoose = {
    pingCheck: jest.fn(() => {
      return 'mongoose';
    }),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        { provide: HealthCheckService, useValue: healthCheckController },
        { provide: HttpHealthIndicator, useValue: mokHttp },
        { provide: MongooseHealthIndicator, useValue: mokMongoose },
      ],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('health check controller', () => {
    it('should be health check controller', () => {
      const healthCheck = controller.checkHealth();
      expect(healthCheck).toBeDefined();
      expect('basic check');
    });

    it('should be health check controller', () => {
      const healthCheck = controller.checkHealth();
      expect(healthCheck).toBeDefined();
      expect('mongoose');
    });
  });
});
