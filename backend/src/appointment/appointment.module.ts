/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Doctor } from 'src/doctor/doctor.entity';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { TimeSlotEntity } from 'src/time-slot/time-slot.entity';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { BullModule } from '@nestjs/bull';
import { AppointmentProcessor } from './appointment.queue';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Doctor,
      User,
      Hospital,
      DoctorSubscription,
      TimeSlotEntity,
    ]),

    BullModule.registerQueue({
      name: 'appointment',
    }),

    AuthModule,
    MailModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, CloudinaryConfig, AppointmentProcessor],
  exports: [AppointmentService],
})
export class AppointmentModule { }
