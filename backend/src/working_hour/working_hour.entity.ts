import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('working_hour')
export class WorkingHour {
    
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column()
    day_index: string;

    @Column({ type: 'text' })
    period_list: string;

    @Column({ type: 'tinyint', default: 1 })
    isActive: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
