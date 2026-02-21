/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentCreateDto } from 'src/doctor/doctor.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BookingPayload, stepOneDto } from './appointment.dto';
// import { MailService } from 'src/mail/mail.service';
import { handleMultipleImages } from 'src/helper/cloudinary.helper';
import { Patient } from 'src/patient/patient.entity';
import { User } from 'src/user/user.entity';
import { Notification } from 'src/notification/notification.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Notification)
        private notificationRepo: Repository<Notification>,

        @InjectQueue('appointment')
        private readonly appointmentQueue: Queue,

        @InjectQueue('mail')
        private readonly mailQueue: Queue,
        // private readonly mailService: MailService,

    ) { }


    async findAll() {
        return this.appointmentRepository.find();
    }


    async create(body: AppointmentCreateDto, userId: number): Promise<Appointment> {

        const appointment = this.appointmentRepository.create({
            appointmentId: 'APP' + Date.now().toString(),
            appointmentStatus: 'NoFill',
            // hospitalId: Number(body.hospitalId),
            doctorId: Number(body.doctorId),
            userId: Number(body.userId ?? userId),
        });

        const saved = await this.appointmentRepository.save(appointment);
        if (!saved) throw new Error('Failed to create appointment');
        const bookingLink = `${process.env.FRONTEND_URL}/booking/${saved.appointmentId}`;
        // await this.mailService.sendReminder(userEmail, bookingLink);

        if (saved.appointmentStatus === 'NoFill' && !saved.appointmentFor && saved.patientEmail) {
            // 45 min reminder
            await this.mailQueue.add(
                'sendReminder',
                {
                    appointmentId: saved.appointmentId,
                    email: saved.patientEmail,
                    link: bookingLink,
                },
                { delay: 5 * 60 * 1000 },
            );
        }

        // 45 * 60 * 1000, 24 * 60 * 60 * 1000
        // 1 day auto delete if still HOLD
        if (saved.appointmentStatus === 'NoFill' && !saved.appointmentFor) {
            await this.appointmentQueue.add(
                'deleteIfNotConfirmed',
                { appointmentId: saved.appointmentId },
                { delay: 24 * 60 * 60 * 1000 },
            );
        }

        return saved;
    }


    async findOne(id: number) {
        return this.appointmentRepository.findOne({ where: { id } });
    }


    async findByAppointmentId(appointmentId: string) {
        // return this.appointmentRepository.findOne({ where: { appointmentId }, relations: ['user', 'hospital', 'doctor'] });
        return this.findOneAppointment(appointmentId);
    }

    async update(doctorId: number, patientId: number, date: string, time: string, status: string) {
        const appointment = await this.appointmentRepository.findOne({ where: { doctorId: doctorId, userId: patientId, date, time } });
        if (!appointment) return 'Appointment not found';
        appointment.appointmentStatus = status;
        return this.appointmentRepository.save(appointment);
    }

    async remove(id: number) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        return this.appointmentRepository.remove(appointment);
    }

    async deleteIfStillPending(appointmentId: string) {
        console.log('deleteIfStillPending', appointmentId);
        const appointment = await this.appointmentRepository.findOne({ where: { appointmentId } });
        if (appointment?.appointmentStatus === 'NoFill') {
            await this.appointmentRepository.remove(appointment);
        }
    }

    async updateStep1(id: number, body: stepOneDto, userId: number) {

        if (!body.selectedPatientId && body.appointmentFor !== 'For me') {
            throw new Error('Please select a patient');
        }

        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) throw new Error('Appointment not found');

        let patientId: number | null = null;


        if (body.appointmentFor === 'For me') {

            // Check if self patient already exists
            const selfPatient = await this.patientRepository.findOne({
                where: {
                    userId: userId,
                    relation: 'For me'
                }
            });

            if (selfPatient) {
                // UPDATE existing self patient
                await this.patientRepository.update(selfPatient.id, {
                    name: body.patientName,
                    age: Number(body.patientAge),
                    email: body.email,
                    phone: body.phoneNumber
                });

                patientId = selfPatient.id;

            } else {
                // CREATE self patient first time
                const newSelfPatient = await this.patientRepository.save({
                    userId,
                    patientId: 'PAT' + Date.now().toString().slice(-6),
                    name: body.patientName,
                    age: Number(body.patientAge),
                    relation: 'For me',
                    email: body.email,
                    phone: body.phoneNumber
                });

                patientId = newSelfPatient.id;
            }
        }


        // NEW PATIENT
        if (body.selectedPatientId === 'new') {
            const newPatient = await this.patientRepository.save({
                userId,
                patientId: 'PAT' + Date.now().toString().slice(-6),
                name: body.patientName,
                age: Number(body.patientAge),
                relation: body.appointmentFor,
                email: body.email,
                phone: body.phoneNumber
            });

            patientId = newPatient.id;
        }

        // EXISTING PATIENT
        if (body.selectedPatientId && body.selectedPatientId !== 'new') {
            patientId = Number(body.selectedPatientId);
        }

        // UPDATE APPOINTMENT
        await this.appointmentRepository.update(id, {
            patientId: patientId,
            appointmentFor: body.appointmentFor,
            illnessInfo: body.illnessInfo,
            sideEffects: body.sideEffects,
            doctorNotes: body.doctorNotes,
            patientEmail: body.email,
            patientNumber: body.phoneNumber,
            patientAddress: body.patientAddress,
            patientAge: Number(body.patientAge),
            patientName: body.patientName,
        });

        return this.findOneAppointment(id);
    }


    async updateBooking(id: number, data: BookingPayload, images: string[]) {

        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) throw new Error('Appointment not found');
        appointment.date = data.date;
        appointment.time = data.time;
        appointment.paymentType = data.paymentType;
        appointment.couponCode = data.couponCode;
        appointment.discountAmount = Number(data.discountAmount);
        appointment.finalAmount = Number(data.finalAmount);
        appointment.appointmentFees = Number(data.appointmentFees);
        appointment.paymentStatus = data.paymentType === 'Online' ? 'Pending' : 'Remaining';
        appointment.appointmentStatus = data.paymentType === 'Online' ? 'HOLD' : 'BOOKED';

        // appointment.images = images;

        appointment.images = await handleMultipleImages(
            images,            // new local file paths
            appointment.images // old cloudinary urls
        );

        // await this.mailService.sendReminder(userEmail, bookingLink);

        if (data.paymentType === 'Offline' && appointment.patientEmail) {
            // 45 min reminder
            await this.mailQueue.add(
                'sendBookingConfirmation',
                {
                    appointment,
                },
                { delay: 1 * 60 * 1000 },
            );


            await this.notificationRepo.save({
                userId: appointment.userId,
                title: 'Appointment Confirmed',
                message: 'Your appointment has been successfully booked.',
                type: 'booking',
            });
        }

        return this.appointmentRepository.save(appointment);

    }

    async patientAppointments(userId: number, page = 1, limit = 10, search = '') {
        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.doctor', 'doctor')
            .leftJoinAndSelect('doctor.hospital', 'hospital')
            .leftJoinAndSelect('a.prescriptions', 'prescription')
            .where('a.userId = :userId', { userId })
            .andWhere('a.appointmentStatus != :status', { status: 'NoFill' });

        if (search) {
            qb.andWhere(
                '(a.appointmentId LIKE :search OR doctor.name LIKE :search OR a.appointmentStatus LIKE :search)',
                { search: `%${search}%` },
            );
        }

        const [data, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('a.createdAt', 'DESC')
            .getManyAndCount();

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }


    async doctorAppointments(
        userId: number,
        page = 1,
        limit = 10,
        search = '',
        patientId?: number
    ) {

        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.user', 'user')
            .leftJoinAndSelect('a.doctor', 'doctor')
            .leftJoinAndSelect('doctor.hospital', 'hospital')
            .leftJoinAndSelect('a.prescriptions', 'prescription')
            .where('a.doctorId = :userId', { userId })
            .andWhere('a.appointmentStatus != :status', { status: 'NoFill' });

        if (patientId) {
            qb.andWhere('a.patientId = :patientId', { patientId });
        }

        if (search) {
            qb.andWhere(
                '(a.appointmentId LIKE :search OR user.username LIKE :search OR a.appointmentStatus LIKE :search)',
                { search: `%${search}%` },
            );
        }

        const [data, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('a.createdAt', 'DESC')
            .getManyAndCount();

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }



    async updateStatus(id: number, status: string) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        appointment.appointmentStatus = status;
        return this.appointmentRepository.save(appointment);
    }

    async createFollowUp(data: { caseId: number; patientId: number; doctorId: number }) {
        const appointment = this.appointmentRepository.create({
            appointmentId: 'APP' + Date.now(),
            caseId: data.caseId,
            patientId: data.patientId,
            doctorId: data.doctorId,
            appointmentStatus: 'Hold',
        });

        return this.appointmentRepository.save(appointment);
    }

    async findFollowUps(caseId: number) {
        return this.appointmentRepository.find({ where: { caseId } });
    }
    async findOneAppointment(id: number | string) {
        return this.appointmentRepository.findOne({
            // where: [{ id }, { appointmentId: id }],
            where: [
                typeof id === 'number' ? { id } : {},
                { appointmentId: String(id) },
            ],
            select: {
                id: true,
                appointmentId: true,
                userId: true,
                doctorId: true,
                patientId: true,
                caseId: true,
                paymentType: true,
                appointmentFor: true,
                patientNumber: true,
                patientEmail: true,
                sideEffects: true,
                razorpayOrderId: true,
                date: true,
                time: true,
                couponCode: true,
                discountAmount: true,
                finalAmount: true,
                appointmentFees: true,
                paymentStatus: true,
                transactionId: true,
                illnessInfo: true,
                doctorNotes: true,
                cancelReason: true,
                discountCode: true,
                discountPrice: true,
                images: true,
                appointmentStatus: true,
                patientName: true,
                patientAge: true,
                user: {
                    id: true,
                    username: true,
                    email: true,
                    phone: true,
                    image: true,
                    age: true,
                    role: true,
                    address: true,
                },

                hospital: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                },
                doctor: {
                    id: true,
                    name: true,
                    expertise: true,
                    experience: true,
                    appointmentFees: true,
                    image: true,
                    desc: true,
                    education: true,
                    certificate: true,
                    timeSlot: true,
                    dob: true,
                    gender: true,
                    isActive: true,
                    isPopular: true,
                    patientVideoCall: true,
                },
                patient: {
                    id: true,
                    name: true,
                    age: true,
                    relation: true,
                },
            },

            relations: {
                user: true,
                doctor: { hospital: true },
                patient: true,
            },
        });
    }

    async markAsPaid(id: number) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        appointment.paymentStatus = 'Paid';
        return this.appointmentRepository.save(appointment);
    }
    // admin functions
    async getAppointmentsForAdmin(query: { type?: string; page?: number; limit?: number; }) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.user', 'user')
            .leftJoinAndSelect('a.doctor', 'doctor')
            .leftJoinAndSelect('doctor.hospital', 'hospital')
            .where('a.appointmentStatus != :status', { status: 'NoFill' });

        if (query.type === 'TODAY') {
            const today = new Date().toISOString().split('T')[0];
            qb.andWhere('a.date = :today', { today });
        }

        if (query.type === 'CANCELLED') {
            qb.andWhere('a.appointmentStatus IN (:...statuses)', {
                statuses: ['Cancelled', 'CancelledByUser', 'CancelledByDoctor'],
            });
        }

        if (query.type === 'COMPLETED') {
            qb.andWhere('a.appointmentStatus = :status', { status: 'Completed' });
        }

        if (query.type === 'REFUND') {
            qb.andWhere('a.paymentStatus = :status', { status: 'RefundRequested' });
        }

        if (query.type === 'RESCHEDULE') {
            qb.andWhere('a.appointmentStatus = :status', { status: 'Rescheduled' });
        }

        const [data, total] = await qb
            .skip(skip)
            .take(limit)
            .orderBy('a.createdAt', 'DESC')
            .getManyAndCount();

        return {
            data,
            lastPage: Math.ceil(total / limit),
        };
    }
}
