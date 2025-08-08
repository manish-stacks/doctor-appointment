/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common'
import { TimeSlotService } from './time-slot.service'
import { CreateTimeSlotDto, UpdateTimeSlotDto } from './time-slot.dto'


@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly service: TimeSlotService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':day')
  findOne(@Param('day') day: string) {
    return this.service.findOne(day)
  }

  @Post()
  create(@Body() dto: CreateTimeSlotDto) {
    return this.service.create(dto)
  }

  @Put()
  update(@Body() dto: UpdateTimeSlotDto) {
    return this.service.update(dto.day, dto)
  }

  @Delete(':day')
  remove(@Param('day') day: string) {
    return this.service.remove(day)
  }
}
