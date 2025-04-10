import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('videocall_history')

export class VideoCallHistory {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column()
    date: string;

    @Column()
    start_time: string;

    @Column()
    duration: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
