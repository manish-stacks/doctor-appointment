/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment]),
        BullModule.registerQueue({
            name: 'appointment',
        }),
        MailModule,
        AppointmentModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule { }
