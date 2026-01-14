/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlotEntity } from './time-slot.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlotEntity]), AuthModule],
  providers: [TimeSlotService],
  controllers: [TimeSlotController]
})
export class TimeSlotModule { }
