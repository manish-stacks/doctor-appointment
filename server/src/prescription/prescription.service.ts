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
  ) { }


  async create(
    appointmentId: number,
    body: {
      medicines: {
        name: string;
        dosage: string;
        duration: string;
        instructions: string;
      }[];
      advice: string;
      followUpDate: string;
    },
    doctorId: number
  ) {
    const prescription = this.prescriptionRepo.create({
      appointmentId,
      doctorId,
      medicines: body.medicines,
      advice: body.advice,
      followUpDate: body.followUpDate
    });

    return this.prescriptionRepo.save(prescription);
  }

  async getPrescription(id: number) {
    return this.prescriptionRepo.findOne({ where: { appointmentId: id } });
  }

  createDemo(doctorId: number, dto: CreatePrescriptionDto) {
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

  async update(
    id: number,
    body: {
      medicines: {
        name: string;
        dosage: string;
        duration: string;
        instructions: string;
      }[];
      advice: string;
      followUpDate: string;
    }) {
    const prescription = await this.prescriptionRepo.findOne({
      where: { id },
    });

    if (!prescription) {
      throw new Error("Prescription not found");
    }

    prescription.medicines = body.medicines;
    prescription.advice = body.advice;
    prescription.followUpDate = body.followUpDate;

    return this.prescriptionRepo.save(prescription);
  }

  // 🔹 Get By Appointment
  async findByAppointment(appointmentId: number) {
    return this.prescriptionRepo.findOne({
      where: { appointmentId },
      order: { createdAt: "DESC" },
    });
  }

  // 🔹 Delete (optional)
  async remove(id: number) {
    return this.prescriptionRepo.delete(id);
  }
}
