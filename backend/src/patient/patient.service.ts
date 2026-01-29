/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) { }

  findMyPatient(userId: number, relation: string) {
    return this.patientRepo.find({ where: { userId, relation } });
  }
  create(userId: number, dto: CreatePatientDto) {
    const patient = this.patientRepo.create({
      ...dto,
      userId,
    });
    return this.patientRepo.save(patient);
  }

  findMyPatients(userId: number) {
    return this.patientRepo.find({ where: { userId } });
  }
}
