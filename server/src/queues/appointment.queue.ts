/* eslint-disable prettier/prettier */
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { AppointmentService } from 'src/appointment/appointment.service';

@Processor('appointment')
export class AppointmentProcessor {
  constructor(
    private readonly appointmentService: AppointmentService,
  ) { }

  @Process('deleteIfNotConfirmed')
  async handleDelete(job: Job) {
    const { appointmentId } = job.data as { appointmentId: string };
    await this.appointmentService.deleteIfStillPending(appointmentId);
  }

}
