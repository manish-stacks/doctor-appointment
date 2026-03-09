/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Request } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Notification } from 'src/notification/notification.entity';
import { Payment } from './payment.entity';
// import { MailService } from 'src/mail/mail.service';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentService {
    private razorpay: any;

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectRepository(DoctorSubscription)
        private doctorSubscriptionRepo: Repository<DoctorSubscription>,

        @InjectRepository(Subscription)
        private subscriptionRepo: Repository<Subscription>,

        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,
        @InjectQueue('appointment')
        private readonly mailQueue: Queue,
        // private readonly mailService: MailService,

        @InjectRepository(Payment)
        private paymentRepo: Repository<Payment>,

    ) {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
    }


    async getAllTransactions(query: { page?: number; limit?: number } = {}) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.paymentRepo.findAndCount({
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            lastPage: Math.ceil(total / limit),
        };
    }

    async getDoctorEarnings() {
        return this.paymentRepo
            .createQueryBuilder('payment')
            .select('payment.doctorId', 'doctorId')
            .addSelect('SUM(payment.doctorEarning)', 'totalEarning')
            .where('payment.paymentStatus = :status', { status: 'Paid' })
            .groupBy('payment.doctorId')
            .getRawMany();
    }

    async getPlatformCommission() {
        const result = await this.paymentRepo
            .createQueryBuilder('payment')
            .select('SUM(payment.platformCommission)', 'totalCommission')
            .where('payment.paymentStatus = :status', { status: 'Paid' })
            .getRawOne();


        return {
            totalCommission: result.totalCommission || 0,
        };
    }

    async getRefunds() {
        return this.paymentRepo.find({
            where: { paymentStatus: 'Refunded' },
            order: { createdAt: 'DESC' },
        });
    }

    async getSubscriptionPayments() {
        return this.paymentRepo.find({
            where: { referenceType: 'SUBSCRIPTION' },
            order: { createdAt: 'DESC' },
        });
    }

    async markPayoutDone(doctorId: number) {
        await this.paymentRepo.update(
            { doctorId, payoutDone: false },
            { payoutDone: true },
        );

        return { message: 'Payout marked as completed' };
    }


    // admin functions end





    async createAppointment(body: { appointmentId: string; amount: number }) {
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

    async verifyAppointment(body: {
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
        if (appointment.patientEmail) {
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

    async webhookAppointment(req: Request) {
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


                await this.notificationRepo.save({
                    userId: appointment.userId,
                    title: 'Appointment Confirmed',
                    message: 'Your appointment has been successfully booked.',
                    type: 'booking',
                });
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

            if (appointment?.patientEmail) {

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
            if (appointment?.patientEmail) {

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


    async createSubscriptionOrder(data: {
        subscriptionId: number;
        amount: number;
    }, doctorId: number) {
        const subscription = await this.subscriptionRepo.findOne({
            where: { id: data.subscriptionId },
        });
        console.log(data.subscriptionId)

        if (!subscription) {
            throw new BadRequestException('Subscription not found');
        }

        if (subscription.price !== data.amount) {
            throw new BadRequestException('Amount mismatch');
        }

        const order = await this.razorpay.orders.create({
            amount: data.amount * 100,
            currency: 'INR',
            receipt: `sub_${Date.now()}`,
            notes: {
                doctorId: doctorId,
                subscriptionId: data.subscriptionId,
            },
        });

        return {
            key: process.env.RAZORPAY_KEY,
            razorpayOrderId: order.id,
            amount: order.amount,
        };
    }

    async verifySubscriptionPayment(data: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }, doctorId: number) {
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET!)
            .update(
                data.razorpay_order_id + '|' + data.razorpay_payment_id,
            )
            .digest('hex');

        if (generatedSignature !== data.razorpay_signature) {
            throw new BadRequestException('Invalid payment signature');
        }

        // 1️⃣ Expire old active subscriptions
        await this.doctorSubscriptionRepo.update(
            { doctorId: doctorId, isActive: true },
            { isActive: false, status: 'expired' },
        );

        // 2️⃣ Get subscriptionId from Razorpay order
        const order = await this.razorpay.orders.fetch(
            data.razorpay_order_id,
        );

        const subscriptionId = Number(
            order.notes.subscriptionId,
        );

        const subscription = await this.subscriptionRepo.findOne({
            where: { id: subscriptionId },
        });

        if (!subscription) {
            throw new BadRequestException('Subscription not found');
        }

        // 3️⃣ Calculate dates
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(
            endDate.getMonth() + subscription.validity,
        );

        // 4️⃣ Create new subscription entry
        await this.doctorSubscriptionRepo.save({
            doctorId: doctorId,
            subscriptionId,
            duration: subscription.validity,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            paymentType: 'razorpay',
            amount: subscription.price,
            paymentId: data.razorpay_payment_id,
            paymentStatus: true,
            appointmentLimit:
                subscription.totalAppointment.toString(),
            usedAppointments: '0',
            status: 'active',
            isActive: true,
        });

        return {
            success: true,
            message: 'Subscription activated successfully',
        };
    }
}
