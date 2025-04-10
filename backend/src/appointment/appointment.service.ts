import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
    constructor(@InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>) { }


    async findAll() {
        return this.appointmentRepository.find();
    }

    async create(doctorId: number, patientId: number, date: string, time: string) {
        const appointment = this.appointmentRepository.create({
            doctorId: doctorId, userId: patientId, date, time
        });
        return this.appointmentRepository.save(appointment);
    }
    async findOne(id: number) {
        return this.appointmentRepository.findOne({ where: { id } });
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
