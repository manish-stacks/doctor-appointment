import { Injectable } from '@nestjs/common';
import { WorkingHour } from './working_hour.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkingHourService {
    constructor(
        @InjectRepository(WorkingHour)
        private readonly workingHourRepository: typeof WorkingHour) { }
}
