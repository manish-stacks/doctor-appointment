import { Module } from '@nestjs/common';
import { WorkingHourController } from './working_hour.controller';
import { WorkingHourService } from './working_hour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHour } from './working_hour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingHour])],
  controllers: [WorkingHourController],
  providers: [WorkingHourService]
})
export class WorkingHourModule { }
