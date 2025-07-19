/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('zoom_meeting')
export class ZoomMeeting {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column({ nullable: true })
    zoom_api_url: string;

    @Column({ nullable: true })
    zoom_api_key: string;

    @Column({ nullable: true })
    zoom_api_secret: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
