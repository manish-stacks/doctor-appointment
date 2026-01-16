/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { doctorDtoCreate } from 'src/doctor/doctor.dto';

@Injectable()
export class AppointmentService {
    constructor(@InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>) { }


    async findAll() {
        return this.appointmentRepository.find();
    }

    async create(body: doctorDtoCreate) {
        const appointment = this.appointmentRepository.create({
            appointmentId: 'APP' + Math.floor(Math.random() * 100000000),
            status: 'pending',
            hospitalId: Number(body.hospitalId),
            doctorId: Number(body.doctorId),
            userId: Number(body.userId),
            // date: body.date,
            // time: body.time
        });
        return this.appointmentRepository.save(appointment);
    }
    async findOne(id: number) {
        return this.appointmentRepository.findOne({ where: { id } });
    }


    async findByAppointmentId(appointmentId: string) {
        // return this.doctorRepository.findOne({
        //     where: { userId },
        //     relations: ['user', 'hospital'],
        // });
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

}
