/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctor/doctor.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    appointmentId: string;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true, nullable: true })
    hospitalId: number;

    @Column({ type: 'varchar', length: 255 })
    paymentType: string;

    @Column({ type: 'varchar', length: 255 })
    appointmentFor: string;

    @Column({ type: 'varchar', length: 255 })
    patientName: string;

    @Column({ type: 'text' })
    phoneNumber: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'int' })
    patientAge: number;

    @Column({ type: 'text' })
    sideEffects: string;

    @Column({ type: 'text' })
    patientAddress: string;

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

    @Column({ type: 'varchar', length: 10, nullable: true })
    isInsured: string;

    @Column({ type: 'text' })
    doctorNotes: string;

    @Column({ type: 'text', nullable: true })
    cancelReason: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    cancelBy: string;

    @Column({ type: 'int', nullable: true })
    discountId: number;

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
        ],
        default: 'Hold',
    })
    appointmentStatus: string;


    // @Column({ type: 'enum', enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected', 'Rescheduled','No Fill'], default: 'Pending' })
    // status: string;

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
}
