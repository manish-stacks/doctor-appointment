/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BookingMailPayload } from 'src/appointment/appointment.dto';
import { MailService } from 'src/mail/mail.service';

@Processor('mail')
export class MailProcessor {
  constructor(
    private readonly mailService: MailService,
  ) { }

  @Process('sendReminder')
  async handleReminder(job: Job) {
    const { email, link } = job.data as { email: string; link: string };
    await this.mailService.sendReminder(email, link);
  }

  @Process('sendBookingConfirmation')
  async handleBookingConfirmation(job: Job) {
    await this.mailService.sendBookingConfirmation(job.data);
  }

  @Process('sendBookingCancellation')
  async handleBookingCancellation(job: Job) {
    await this.mailService.sendBookingCancellation(job.data);
  }

  @Process('sendPaymentFailed')
  async handlePaymentFailed(job: Job) {
    await this.mailService.sendPaymentFailed(job.data);
  }

  @Process('sendRefundProcessed')
  async handleRefundProcessed(job: Job) {
    await this.mailService.sendRefundProcessed(job.data);
  }

  @Process('sendAppointmentReminder')
  async handleAppointmentReminder(job: Job) {
    await this.mailService.sendAppointmentReminder(job.data);
  }

  @Process('sendAppointmentRescheduled')
  async handleAppointmentRescheduled(job: Job) {
    const { appointment, oldDate, oldTime } = job.data as {
      appointment: BookingMailPayload;
      oldDate: string;
      oldTime: string;
    };
    await this.mailService.sendAppointmentRescheduled({ appointment, oldDate, oldTime });
  }


}
