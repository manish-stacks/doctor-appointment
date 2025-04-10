import { Module } from '@nestjs/common';
import { ZoomMeetingController } from './zoom_meeting.controller';
import { ZoomMeetingService } from './zoom_meeting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoomMeeting } from './zoom_meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZoomMeeting])],
  controllers: [ZoomMeetingController],
  providers: [ZoomMeetingService]
})
export class ZoomMeetingModule {}
