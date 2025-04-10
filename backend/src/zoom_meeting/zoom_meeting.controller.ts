import { Controller } from '@nestjs/common';
import { ZoomMeetingService } from './zoom_meeting.service';

@Controller('zoom-meeting')
export class ZoomMeetingController {
    constructor(private readonly zoomMeetingService: ZoomMeetingService) {}
}
