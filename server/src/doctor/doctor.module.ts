/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { TimeSlotEntity } from 'src/time-slot/time-slot.entity';
import { Appointment } from 'src/appointment/appointment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, User, Hospital, DoctorSubscription, Subscription, TimeSlotEntity, Appointment]),
    AuthModule,
  ],
  providers: [
    DoctorService,
    CloudinaryConfig,
  ],
  controllers: [DoctorController],
})
export class DoctorModule { }
