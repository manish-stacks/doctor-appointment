/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int' })
    totalAppointment: number;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    validity: number;
    
    @Column({ type: 'text', nullable: true })
    description: string;
    
    @Column({ type: 'varchar', nullable: true })
    period: string;

    @Column({ type: 'varchar', nullable: true })
    features: string;

    @Column({ type: 'varchar', nullable: true })
    noAddonFeatures: string;

    @Column({ type: 'varchar', nullable: true })
    buttonText: string;

    @Column({ type: 'varchar', nullable: true })
    gradient: string;

    @Column({ type: 'varchar', nullable: true })
    buttonStyle: string;

    @Column({ type: 'varchar', nullable: true })
    buttonTextColor: string;

    @Column({type: 'tinyint', default: false })
    popular: boolean;
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
