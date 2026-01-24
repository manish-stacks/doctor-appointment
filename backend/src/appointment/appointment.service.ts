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

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectQueue('appointment')
        private readonly appointmentQueue: Queue,

        @InjectQueue('mail')
        private readonly mailQueue: Queue,
        // private readonly mailService: MailService,

    ) { }


    async findAll() {
        return this.appointmentRepository.find();
    }


    async create(body: AppointmentCreateDto, userId: number) {

        const appointment = this.appointmentRepository.create({
            appointmentId: 'APP' + Date.now().toString(),
            status: 'No Fill',
            hospitalId: Number(body.hospitalId),
            doctorId: Number(body.doctorId),
            userId: Number(body.userId || userId),
        });

        const saved = await this.appointmentRepository.save(appointment);
        if (!saved) throw new Error('Failed to create appointment');
        const bookingLink = `${process.env.FRONTEND_URL}/booking/${saved.appointmentId}`;
        // await this.mailService.sendReminder(userEmail, bookingLink);

        if (saved.appointmentStatus === 'Hold' && !saved.appointmentFor && saved.email) {
            // 45 min reminder
            await this.mailQueue.add(
                'sendReminder',
                {
                    appointmentId: saved.appointmentId,
                    email: saved.email,
                    link: bookingLink,
                },
                { delay: 5 * 60 * 1000 },
            );
        }

        // 45 * 60 * 1000, 24 * 60 * 60 * 1000
        // 1 day auto delete if still HOLD
        if (saved.appointmentStatus === 'Hold' && !saved.appointmentFor) {
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
        return this.appointmentRepository.findOne({ where: { appointmentId }, relations: ['user', 'hospital', 'doctor'] });
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
        if (appointment?.appointmentStatus === 'Hold') {
            await this.appointmentRepository.remove(appointment);
        }
    }

    async updateStep1(id: number, body: stepOneDto) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        await this.appointmentRepository.update(appointment.id, {
            appointmentFor: body.appointmentFor,
            patientName: body.patientName,
            patientAge: Number(body.patientAge),
            phoneNumber: body.phoneNumber,
            email: body.email,
            illnessInfo: body.illnessInfo,
            patientAddress: body.patientAddress,
            sideEffects: body.sideEffects,
            doctorNotes: body.doctorNotes,
            isInsured: body.isInsured,
        });

        return this.appointmentRepository.findOne({ where: { id }, relations: ['user', 'hospital', 'doctor'] });

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

        if (data.paymentType === 'Offline' && appointment.email) {
            // 45 min reminder
            await this.mailQueue.add(
                'sendBookingConfirmation',
                {
                    appointment,
                },
                { delay: 1 * 60 * 1000 },
            );
        }

        return this.appointmentRepository.save(appointment);

    }
   
    async patientAppointments(userId: number, page = 1, limit = 10, search = '') {
        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.doctor', 'doctor')
            .leftJoinAndSelect('a.hospital', 'hospital')
            .where('a.userId = :userId', { userId })
            .andWhere('a.appointmentStatus != :status', { status: 'Hold' });

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

    async doctorAppointments(userId: number, page = 1, limit = 10, search = '') {
        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.user', 'user')
            .leftJoinAndSelect('a.hospital', 'hospital')
            .where('a.doctorId = :userId', { userId })
            .andWhere('a.appointmentStatus != :status', { status: 'Hold' });

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

}
