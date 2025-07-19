/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('doctor_subscriptions')
export class DoctorSubscription {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
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
    paymentToken: string;

    @Column({ type: 'tinyint' })
    paymentStatus: boolean;

    @Column({ type: 'int', default: 0 })
    bookedAppointment: number;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
