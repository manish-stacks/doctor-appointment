/* eslint-disable prettier/prettier */
import { CaseFile } from 'src/case/case.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { Patient } from 'src/patient/patient.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    appointmentId: string;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    patientId: number | null;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    caseId: number;

    @Column({ type: 'varchar', length: 255 })
    paymentType: string;

    @Column({ type: 'varchar', length: 255 })
    appointmentFor: string;

    @Column({ type: 'varchar', length: 255 })
    patientName: string;

    @Column({ type: 'varchar', length: 10 })
    patientAge: number;

    @Column({ type: 'text' })
    patientNumber: string;

    @Column({ type: 'text' })
    patientEmail: string;

    @Column({ type: 'varchar', length: 255 })
    patientAddress: string;

    @Column({ type: 'text' })
    sideEffects: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    razorpayOrderId: string;

    @Column({ type: 'varchar', length: 255 })
    date: string;

    @Column({ type: 'varchar', length: 255 })
    time: string;

    @Column({ type: 'varchar', length: 255 })
    couponCode: string;

    @Column({ type: 'int', nullable: true })
    discountAmount: number;

    @Column({ type: 'int' })
    finalAmount: number;

    @Column({ type: 'int', nullable: true })
    appointmentFees: number;

    @Column({ type: 'varchar', nullable: true })
    paymentStatus: string;

    @Column({ type: 'varchar', nullable: true })
    transactionId: string;

    @Column({ type: 'varchar', nullable: true })
    illnessInfo: string;

    @Column({ type: 'text' })
    doctorNotes: string;

    @Column({ type: 'text', nullable: true })
    cancelReason: string;

    @Column({ type: 'varchar', nullable: true })
    discountCode: number;

    @Column({ type: 'int', nullable: true })
    discountPrice: number;

    @Column({ type: 'json', nullable: true })
    images: string[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    zoomUrl: string;

    @Column({
        type: 'enum',
        enum: [
            'Available',
            'Booked',
            'Hold',
            'Approved',
            'Rescheduled',
            'Completed',
            'CancelledByUser',
            'Cancelled',
            'CancelledByDoctor',
            'NoFill',
        ],
        default: 'Hold',
    })
    appointmentStatus: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Hospital, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'hospitalId' })
    hospital: Hospital;

    @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;

    @ManyToOne(() => Patient, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'patientId' })
    patient: Patient | null;

    @ManyToOne(() => CaseFile, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'caseId' })
    case: CaseFile;

    @OneToMany(() => Prescription, (prescription) => prescription.appointment)
    prescriptions: Prescription[];
}
