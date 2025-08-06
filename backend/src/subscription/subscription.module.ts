/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Doctor, DoctorSubscription]),
    AuthModule
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule { }
