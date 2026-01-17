/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentCreateDto } from 'src/doctor/doctor.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { stepOneDto } from './appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectQueue('appointment')
        private readonly appointmentQueue: Queue,

    ) { }


    async findAll() {
        return this.appointmentRepository.find();
    }


    async create(body: AppointmentCreateDto) {

        const appointment = this.appointmentRepository.create({
            appointmentId: 'APP' + Date.now().toString(),
            status: 'Pending',
            hospitalId: Number(body.hospitalId),
            doctorId: Number(body.doctorId),
            userId: Number(body.userId),
        });

        const saved = await this.appointmentRepository.save(appointment);

        const bookingLink = `${process.env.FRONTEND_URL}/booking/${saved.appointmentId}`;

        console.log("bookingLink", bookingLink)
        const userEmail = 'mks957678@gmail.com';
        if (userEmail) {
            // 45 min reminder
            await this.appointmentQueue.add(
                'sendReminder',
                {
                    appointmentId: saved.appointmentId,
                    email: userEmail,
                    link: bookingLink,
                },
                { delay: 1 * 60 * 1000 },
            );
        }

        // 45 * 60 * 1000, 24 * 60 * 60 * 1000
        // 1 day auto delete if still HOLD
        await this.appointmentQueue.add(
            'deleteIfNotConfirmed',
            { appointmentId: saved.appointmentId },
            { delay: 1 * 60 * 1000 },
        );

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

    async deleteIfStillHold(appointmentId: string) {

        const appointment = await this.appointmentRepository.findOne({ where: { appointmentId } });
        if (appointment && appointment.status === 'Pending') {
            await this.appointmentRepository.remove(appointment);
        }
    }

    async updateStep1(id: number, body: stepOneDto) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        return this.appointmentRepository.update(appointment.id, {
            appointmentFor: body.appointmentFor,
            patientName: body.patientName,
            age: Number(body.patientAge),
            phoneNo: body.phoneNumber,
            illnessInfo: body.illnessInfo,
            patientAddress: body.address,
            drugEffect: body.sideEffects,
            note: body.doctorNotes,
            isInsured: body.isInsured,
        });
    }

    async updateBooking(id: number, data: stepOneDto, images: string[]) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return 'Appointment not found';
        return this.appointmentRepository.update(appointment.id, {
            appointmentFor: data.appointmentFor,
            patientName: data.patientName,
            age: Number(data.patientAge),
            phoneNo: data.phoneNumber,
            illnessInfo: data.illnessInfo,
            patientAddress: data.address,
            drugEffect: data.sideEffects,
            note: data.doctorNotes,
            isInsured: data.isInsured,
            date: data.date,
            time: data.time,
            images: images,
            status: 'Confirmed'
        });
    }


}
