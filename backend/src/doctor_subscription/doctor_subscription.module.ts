import { Module } from '@nestjs/common';
import { DoctorSubscriptionController } from './doctor_subscription.controller';
import { DoctorSubscriptionService } from './doctor_subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSubscription } from './doctor_subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorSubscription])], 
  controllers: [DoctorSubscriptionController],
  providers: [DoctorSubscriptionService]
})
export class DoctorSubscriptionModule { }
