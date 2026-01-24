/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Request } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
// import { MailService } from 'src/mail/mail.service';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentService {
    private razorpay: any;

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectQueue('appointment')
        private readonly mailQueue: Queue,
        // private readonly mailService: MailService,

    ) {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
    }

    async createOrder(body: { appointmentId: string; amount: number }) {
        const order = await this.razorpay.orders.create({
            amount: Math.round(body.amount * 100),
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: { appointmentId: body.appointmentId },
        });

        const appointment = await this.appointmentRepository.findOne({
            where: { appointmentId: body.appointmentId },
        });
        if (!appointment) throw new BadRequestException('Appointment not found');

        appointment.razorpayOrderId = order.id;
        await this.appointmentRepository.save(appointment);

        return {
            key: process.env.RAZORPAY_KEY,
            razorpayOrderId: order.id,
            amount: order.amount,
        };
    }

    async verify(body: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) {
        const generated = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET!)
            .update(body.razorpay_order_id + '|' + body.razorpay_payment_id)
            .digest('hex');

        if (generated !== body.razorpay_signature) {
            throw new BadRequestException('Invalid signature');
        }

        const appointment = await this.appointmentRepository.findOne({
            where: { razorpayOrderId: body.razorpay_order_id },
        });

        if (!appointment) throw new BadRequestException('Appointment not found');

        appointment.transactionId = body.razorpay_payment_id;
        appointment.paymentStatus = 'Paid';
        appointment.appointmentStatus = 'BOOKED';

        await this.appointmentRepository.save(appointment);
        if (appointment.email) {
            await this.mailQueue.add(
                'sendBookingConfirmation',
                {
                    appointment,
                },
                { delay: 1 * 60 * 1000 },
            );
        }

        return { success: true, message: 'Payment verified successfully' };
    }

    async webhook(req: Request) {
        const signature = req.headers['x-razorpay-signature'] as string;
        const body = req.body;

        const expected = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest('hex');

        if (expected !== signature) {
            throw new BadRequestException('Invalid webhook signature');
        }

        const event = JSON.parse(body.toString());

      
        if (event.event === 'payment.captured') {
            const orderId = event.payload.payment.entity.order_id;

            const appointment = await this.appointmentRepository.findOne({
                where: { razorpayOrderId: orderId }
            });

            if (appointment) {
                appointment.paymentStatus = 'Paid';
                appointment.appointmentStatus = 'BOOKED';
                await this.appointmentRepository.save(appointment);
            }
        }

        
        if (event.event === 'payment.failed') {
            const orderId = event.payload.payment.entity.order_id;

            const appointment = await this.appointmentRepository.findOne({
                where: { razorpayOrderId: orderId }
            });

            if (appointment) {
                appointment.paymentStatus = 'Failed';
                appointment.appointmentStatus = 'HOLD';
                await this.appointmentRepository.save(appointment);
            }

            if (appointment?.email) {
               
                await this.mailQueue.add(
                    'sendPaymentFailed',
                    {
                        appointment,
                    },
                    { delay: 1 * 60 * 1000 },
                );
            }
        }

  
        if (event.event === 'refund.processed') {
            const refund = event.payload.refund.entity;

            const appointment = await this.appointmentRepository.findOne({
                where: { razorpayOrderId: refund.order_id }
            });

            if (appointment) {
                appointment.transactionId = refund?.payment_id;
                appointment.paymentStatus = 'Refunded';
                appointment.appointmentStatus = 'HOLD';
                await this.appointmentRepository.save(appointment);
            }
            if (appointment?.email) {
               
                await this.mailQueue.add(
                    'sendRefundProcessed',
                    {
                        appointment,
                    },
                    { delay: 1 * 60 * 1000 },
                );
            }
        }

        return { received: true };
    }
}
