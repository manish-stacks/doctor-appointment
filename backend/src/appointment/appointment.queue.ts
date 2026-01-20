/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AppointmentService } from './appointment.service';
import { MailService } from 'src/mail/mail.service';
import { BookingMailPayload } from './appointment.dto';

@Processor('appointment')
export class AppointmentProcessor {
  constructor(
    private readonly mailService: MailService,
    private readonly appointmentService: AppointmentService,
  ) { }

  @Process('sendReminder')
  async handleReminder(job: Job) {
    const { email, link } = job.data as { email: string; link: string };
    await this.mailService.sendReminder(email, link);
  }



  @Process('deleteIfNotConfirmed')
  async handleDelete(job: Job) {
    const { appointmentId } = job.data as { appointmentId: string };
    await this.appointmentService.deleteIfStillPending(appointmentId);
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
