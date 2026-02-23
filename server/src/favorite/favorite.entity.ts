/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctor/doctor.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor;
}
