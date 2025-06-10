/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Hospital {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column()
    name: string;

    @Column({ length: 100, nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    lat: string;

    @Column({ nullable: true })
    lng: string;

    @Column({ type: 'text', nullable: true })
    facility: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isActive: boolean;
   
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}