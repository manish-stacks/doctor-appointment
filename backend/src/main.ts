/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api');
  app.use(
    '/razorpay/webhooks',
    bodyParser.raw({ type: 'application/json' }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();