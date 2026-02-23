/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TimeSlotEntity } from './time-slot.entity'
import { CreateTimeSlotDto, UpdateTimeSlotDto } from './time-slot.dto'

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlotEntity)
    private readonly repo: Repository<TimeSlotEntity>,
  ) { }

  async findAll(): Promise<Record<string, any>> {
    const records = await this.repo.find()
    return records.reduce((acc, curr) => {
      acc[curr.day] = { active: curr.active, slots: curr.slots }
      return acc
    }, {} as Record<string, any>)
  }

  async findOne(day: string) {
    const slot = await this.repo.findOne({ where: { day } })
    if (!slot) throw new NotFoundException(`No time slot for ${day}`)
    return slot
  }

  async create(dto: CreateTimeSlotDto) {
    const slot = this.repo.create(dto)
    return this.repo.save(slot)
  }

  async update(doctorId: number, dto: UpdateTimeSlotDto) {
    const existing = await this.repo.findOne({ where: { doctorId, day: dto.day } });

    if (!existing) {
      const created = this.repo.create({ ...dto, doctorId });
      return this.repo.save(created);
    }

    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(day: string) {
    const slot = await this.repo.findOne({ where: { day } })
    if (!slot) throw new NotFoundException(`No time slot for ${day}`)
    return this.repo.remove(slot)
  }
}
