/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    review: string;

    @Column('int')
    rate: number;

    @Column({ type: 'bigint', unsigned: true })
    appointmentId: number;

    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
