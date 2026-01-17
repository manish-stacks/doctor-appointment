/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AppointmentService } from './appointment.service';
import { MailService } from 'src/mail/mail.service';

@Processor('appointment')
export class AppointmentProcessor {
  constructor(
    private readonly mailService: MailService,
    private readonly appointmentService: AppointmentService,
  ) {}

  // 45 minute reminder mail
  @Process('sendReminder')
  async handleReminder(job: Job) {
    const { email, link } = job.data;
    await this.mailService.sendReminder(email, link);
  }

  // 1 day baad delete if still HOLD
  @Process('deleteIfNotConfirmed')
  async handleDelete(job: Job) {
    const { appointmentId } = job.data;
    await this.appointmentService.deleteIfStillHold(appointmentId);
  }
}
