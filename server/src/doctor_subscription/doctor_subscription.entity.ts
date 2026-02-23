/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctor/doctor.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('doctor_subscriptions')
export class DoctorSubscription {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    doctorId: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    subscriptionId: number;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'varchar', length: 255 })
    startDate: string;

    @Column({ type: 'varchar', length: 255 })
    endDate: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    paymentType: string;

    @Column({ type: 'int', nullable: true })
    amount: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    paymentId?: string | null;

    @Column({ type: 'tinyint' })
    paymentStatus: boolean;

    @Column({ type: 'varchar', length: 255, default: 0 })
    appointmentLimit?: string | null;

    @Column({ type: 'varchar', length: 255, default: 0 })
    usedAppointments?: string;

    @Column({ type: 'enum', enum: ['active', 'expired'], default: 'active', })
    status: string;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;

    @ManyToOne(() => Subscription, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'subscriptionId' })
    subscription: Subscription;
}
