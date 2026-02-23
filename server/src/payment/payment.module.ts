/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Subscription } from 'src/subscription/subscription.entity';
import { Notification } from 'src/notification/notification.entity';
import { Payment } from './payment.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, DoctorSubscription, Subscription, Notification, Payment]),
        BullModule.registerQueue({
            name: 'appointment',
        }),
        MailModule,
        AppointmentModule,
        AuthModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule { }
