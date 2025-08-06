/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DoctorSubscriptionController } from './doctor_subscription.controller';
import { DoctorSubscriptionService } from './doctor_subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSubscription } from './doctor_subscription.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorSubscription]), 
    AuthModule
  ],
  controllers: [DoctorSubscriptionController],
  providers: [DoctorSubscriptionService]
})
export class DoctorSubscriptionModule { }
