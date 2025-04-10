import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';

@Injectable()
export class PrescriptionService {
    constructor(@InjectRepository(Prescription) private readonly prescriptionRepository: Repository<Prescription>) { }

    findAll() {
        return this.prescriptionRepository.find();
    }

    create(appointmentId: number, doctorId: number, userId: number, medicines: string, pdf: string) {
        const prescription = this.prescriptionRepository.create({ appointmentId, doctorId, userId, medicines, pdf });
        return this.prescriptionRepository.save(prescription);
    }

    findOne(id: number) {
        return this.prescriptionRepository.findOne({ where: { id } });
    }

    update(id: number, appointmentId: number, doctorId: number, userId: number, medicines: string, pdf: string) {
        const prescription = this.prescriptionRepository.create({ id, appointmentId, doctorId, userId, medicines, pdf });
        return this.prescriptionRepository.save(prescription);
    }

    delete(id: number) {
        return this.prescriptionRepository.delete({ id });
    }
}
