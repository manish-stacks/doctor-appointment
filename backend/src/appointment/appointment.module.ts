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
import { Subscription } from 'rxjs';
import { TimeSlotEntity } from 'src/time-slot/time-slot.entity';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Doctor, User, Hospital, DoctorSubscription, Subscription, TimeSlotEntity]),
    AuthModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, CloudinaryConfig],
})
export class AppointmentModule { }
