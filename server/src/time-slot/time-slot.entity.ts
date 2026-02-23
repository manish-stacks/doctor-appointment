/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('time_slots')
export class TimeSlotEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  day: string

  @Column()
  doctorId: number;

  @Column({ default: true })
  active: boolean

  @Column('json')
  slots: { start: string; end: string }[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
