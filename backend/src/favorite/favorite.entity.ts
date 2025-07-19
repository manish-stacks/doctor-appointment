/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
