/* eslint-disable prettier/prettier */

import { Doctor } from "src/doctor/doctor.entity";
import { Patient } from "src/patient/patient.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cases')
export class CaseFile {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    patientId: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    doctorId: number;

    @Column()
    disease: string;

    @Column({ default: 'Ongoing', comment: 'Ongoing or Closed' })
    status: string; // Ongoing, Closed


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Patient, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'patientId' })
    patient: Patient;

    @ManyToOne(() => Doctor, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;
}
