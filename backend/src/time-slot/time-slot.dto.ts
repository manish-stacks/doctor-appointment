/* eslint-disable prettier/prettier */

import { IsBoolean, IsString, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class SlotDto {
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
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  slots: SlotDto[]
}

export class UpdateTimeSlotDto extends CreateTimeSlotDto{}