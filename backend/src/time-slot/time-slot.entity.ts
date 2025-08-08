/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('time_slots')
export class TimeSlotEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  day: string 

  @Column({ default: true })
  active: boolean

  @Column('json')
  slots: { start: string; end: string }[] 
}
