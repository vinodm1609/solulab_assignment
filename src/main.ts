import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { format, transports } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
async function bootstrap() {
  // Her setUp winston logger.
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.errors({ stack: true }),
            nestWinstonModuleUtilities.format.nestLike(process.env.APP_NAME, {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),

        new transports.File({
          filename:
            'logs/Combined-' + new Date(Date.now()).toDateString() + '.log',
          level: 'debug',
          handleExceptions: true,
          format: format.combine(
            /** tells winston to generate timestamp on log lines */
            format.timestamp(),
            format.ms(),
            /** print stack trace as part of log */
            format.errors({ stack: true }),
            /** json log format. */
            nestWinstonModuleUtilities.format.nestLike(process.env.APP_NAME, {
              colors: true,
              prettyPrint: true,
            }),

            format.printf(
              (error) =>
                `${error.level}: ${[error.timestamp]}: ${error.message}`,
            ),
          ),
        }),
      ],
    }),
  });

  const httpAdapter = app.get(HttpAdapterHost);

  // use global response Interceptors.
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // use global response Interceptors.
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  const appConfig = app.get(ConfigService);
  // this is global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // set global prefix command api
  app.setGlobalPrefix('/api');
  app.enableCors();

  // set global helmet

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.referrerPolicy());
  app.use(helmet.hidePoweredBy());

  //her creating swagger DocumentBuilder,createDocument and setUp.

  const config = new DocumentBuilder()
    .setTitle('solulab')
    .setDescription('Solulab Api')
    .setVersion('v1')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('solulab', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
