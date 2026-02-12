/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from 'src/appointment/appointment.entity';
import { CaseFile } from 'src/case/case.entity';
import { Doctor } from 'src/doctor/doctor.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  appointmentId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  caseId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  doctorId: number;

  @Column({ type: 'json' })
  medicines: {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];

  @Column({ type: 'text', nullable: true })
  advice: string;

  @Column({ nullable: true })
  followUpDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => Appointment, { nullable: true, onDelete: 'SET NULL' })
  // @JoinColumn({ name: 'appointmentId' })
  // appointment: Appointment;

  @ManyToOne(() => CaseFile, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'caseId' })
  case: CaseFile;

  @ManyToOne(() => Doctor, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Appointment, (appointment) => appointment.prescriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;
}
