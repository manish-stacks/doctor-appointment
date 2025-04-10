import { Controller } from '@nestjs/common';
import { VideocallHistoryService } from './videocall_history.service';

@Controller('videocall-history')
export class VideocallHistoryController {

    constructor(private readonly videocallHistoryService: VideocallHistoryService) { }
}
