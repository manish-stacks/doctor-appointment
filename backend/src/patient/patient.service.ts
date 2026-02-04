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

  async findMyPatient(userId: number, relation: string) {
    return this.patientRepo.find({ where: { userId, relation } });
  }
  async create(userId: number, dto: CreatePatientDto) {
    const patient = this.patientRepo.create({
      ...dto,
      userId,
    });
    return this.patientRepo.save(patient);
  }

  // findMyPatients(userId: number) {
  //   return this.patientRepo.find({ where: { userId } });
  // }

  async findAll(
    patientId: number,
    page = 1,
    limit = 10,
    search = '',
  ) {
    const query = this.patientRepo
      .createQueryBuilder('patient')
      .where('patient.userId = :patientId', { patientId })
      .orderBy('patient.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.andWhere('patient.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }


  async update(id: number, dto: CreatePatientDto) {
    await this.patientRepo.update(id, dto);
    return { message: 'Updated successfully' };
  }

  async remove(id: number) {
    await this.patientRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
