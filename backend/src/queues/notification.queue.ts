/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';


@Processor('notification')
export class NotificationProcessor {
  constructor(
    private readonly mailService: MailService,
  ) { }

  @Process('sendReminder')
  async handleReminder(job: Job) {
    const { email, link } = job.data as { email: string; link: string };
    await this.mailService.sendReminder(email, link);
  }



}
