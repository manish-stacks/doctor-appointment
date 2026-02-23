/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './patient.dto';
import { Appointment } from 'src/appointment/appointment.entity';
import { Parser } from 'json2csv';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
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

  async findMyPatients(userId: number, search?: string) {
    const query = this.appointmentRepo
      .createQueryBuilder('appointment')
      .leftJoin('appointment.patient', 'patient')
      .where('appointment.doctorId = :userId', { userId })
      .andWhere('appointment.patientId IS NOT NULL');

    if (search) {
      query.andWhere(
        `(patient.name LIKE :search 
        OR patient.email LIKE :search 
        OR patient.phone LIKE :search)`,
        { search: `%${search}%` }
      );
    }

    return query
      .select([
        'patient.id as patientId',
        'patient.name as patientName',
        'patient.email as patientEmail',
        'patient.phone as patientPhone',
        'patient.relation as patientRelation',
        'patient.patientId as patientUniqId',
        'COUNT(appointment.id) as totalAppointments'
      ])
      .groupBy('patient.id')
      // .addGroupBy('patient.name')
      // .addGroupBy('patient.email')
      // .addGroupBy('patient.phone')
      .getRawMany();
  }



  // ======================
  // CSV EXPORT
  // ======================
  async exportCSV(userId: number, search: string): Promise<string> {
    const patients = await this.findMyPatients(userId, search);

    const fields = [
      { label: 'Name', value: 'patientName' },
      { label: 'Email', value: 'patientEmail' },
      { label: 'Mobile', value: 'patientPhone' },
      { label: 'Appointments', value: 'totalAppointments' },
    ];

    const parser = new Parser({ fields });
    return parser.parse(patients);
  }

  // ======================
  // PDF EXPORT
  // ======================
  async exportPDF(userId: number, search: string): Promise<Buffer> {
    const patients = await this.findMyPatients(userId, search);

    const doc = new PDFDocument({ margin: 30 });
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => { });

    doc.fontSize(18).text('Patients Report', { align: 'center' });
    doc.moveDown();

    patients.forEach((p, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${p.patientName} | ${p.patientEmail || '-'} | ${p.patientPhone || '-'
          } | Appointments: ${p.totalAppointments}`,
        );
      doc.moveDown(0.5);
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }

}
