/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerUtil } from './SendEmail';

@Module({
  providers: [MailerUtil],
  exports: [MailerUtil],
})
export class UtilsModule {}
