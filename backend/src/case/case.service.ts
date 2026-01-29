/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseFile } from './case.entity';
import { CreateCaseDto } from './case.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(CaseFile)
    private caseRepo: Repository<CaseFile>,
  ) {}

  create(dto: CreateCaseDto) {
    const newCase = this.caseRepo.create(dto);
    return this.caseRepo.save(newCase);
  }

  findByPatient(patientId: number) {
    return this.caseRepo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  closeCase(caseId: number) {
    return this.caseRepo.update(caseId, { status: 'Closed' });
  }
}
