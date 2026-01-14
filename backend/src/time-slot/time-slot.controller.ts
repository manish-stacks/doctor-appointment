/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Param, Body, Delete, UseGuards, Request } from '@nestjs/common'
import { TimeSlotService } from './time-slot.service'
import { CreateTimeSlotDto, UpdateTimeSlotDto } from './time-slot.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly service: TimeSlotService) { }

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

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req: { user: { id: number } }, @Body() dto: UpdateTimeSlotDto) {
    return this.service.update(req.user.id, dto);
  }

  @Delete(':day')
  remove(@Param('day') day: string) {
    return this.service.remove(day)
  }
}
