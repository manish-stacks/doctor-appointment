import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZoomMeeting } from './zoom_meeting.entity';

@Injectable()
export class ZoomMeetingService {
    constructor(@InjectRepository(ZoomMeeting)
    private readonly zoomMeetingRepository: typeof ZoomMeeting) { }
}
