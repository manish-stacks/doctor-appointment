import { Controller } from '@nestjs/common';
import { WorkingHourService } from './working_hour.service';

@Controller('working-hour')
export class WorkingHourController {
    constructor(private readonly workingHourService: WorkingHourService) {}
}
