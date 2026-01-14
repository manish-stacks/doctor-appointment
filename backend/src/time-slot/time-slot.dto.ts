/* eslint-disable prettier/prettier */

import { IsBoolean, IsString, IsArray } from 'class-validator'

export class TimeSlotDto {
  @IsString()
  start: string

  @IsString()
  end: string
}

export class CreateTimeSlotDto {
  @IsString()
  day: string

  @IsBoolean()
  active: boolean

  @IsArray()
  slots: TimeSlotDto[]
}

export class UpdateTimeSlotDto extends CreateTimeSlotDto {}
