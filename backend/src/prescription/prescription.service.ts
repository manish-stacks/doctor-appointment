/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';
import { CreatePrescriptionDto } from './prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepo: Repository<Prescription>,
  ) {}

  create(doctorId: number, dto: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepo.create({
      ...dto,
      doctorId,
    });
    return this.prescriptionRepo.save(prescription);
  }

  getCaseHistory(caseId: number) {
    return this.prescriptionRepo.find({
      where: { caseId },
      order: { createdAt: 'ASC' },
    });
  }
}
