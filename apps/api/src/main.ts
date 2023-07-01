import { config } from 'dotenv';
config();

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.getHttpAdapter().getInstance().set('trust proxy', true);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
