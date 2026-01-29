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

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

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

        if (saved.appointmentStatus === 'NoFill' && !saved.appointmentFor && saved.email) {
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
        if (appointment?.appointmentStatus === 'NoFill') {
            await this.appointmentRepository.remove(appointment);
        }
    }

    async updateStep1(id: number, body: stepOneDto, userId: number) {
        if (!body.selectedPatientId) throw new Error('Please select a patient');
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) throw new Error('Appointment not found');
        console.log(body)
        let patientId: number | null = null;

        // SELF CASE
        if (body.appointmentFor === 'Self') {
            await this.userRepository.update(userId, {
                email: body.email,
                username: body.patientName,
                phone: body.phoneNumber,
                address: body.patientAddress,
                age: Number(body.patientAge),
            });

            patientId = null; // SELF → no patient table entry
        }

        // NEW PATIENT
        if (body.selectedPatientId === 'new') {
            const newPatient = await this.patientRepository.save({
                userId,
                name: body.patientName,
                age: Number(body.patientAge),
                relation: body.appointmentFor,
            });

            patientId = newPatient.id;
        }

        // EXISTING PATIENT
        if (body.selectedPatientId && body.selectedPatientId !== 'new') {
            patientId = Number(body.selectedPatientId);
        }

        await this.appointmentRepository.update(id, {
            patientId: patientId, 
            appointmentFor: body.appointmentFor,
            illnessInfo: body.illnessInfo,
            sideEffects: body.sideEffects,
            doctorNotes: body.doctorNotes,
        });

        return this.appointmentRepository.findOne({
            where: { id },
            relations: ['user', 'hospital', 'doctor', 'patient'],
        });
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

    async doctorAppointments(userId: number, page = 1, limit = 10, search = '') {
        const qb = this.appointmentRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.user', 'user')
            .leftJoinAndSelect('a.hospital', 'hospital')
            .where('a.doctorId = :userId', { userId })
            .andWhere('a.appointmentStatus != :status', { status: 'NoFill' });

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


}
