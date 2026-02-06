/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import { setupBullBoard } from './helper/bull-board';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(
    '/razorpay/appointment/webhooks',
    bodyParser.raw({ type: 'application/json' }),
  );


  // queeue
  const mailQueue = app.get<Queue>(getQueueToken('mail'));
  const appointmentQueue = app.get<Queue>(getQueueToken('appointment'));
  const notificationQueue = app.get<Queue>(getQueueToken('notification'));

  const serverAdapter = setupBullBoard([
    mailQueue,
    appointmentQueue,
    notificationQueue,
  ]);

  serverAdapter.setBasePath('/admin/queues');
  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();