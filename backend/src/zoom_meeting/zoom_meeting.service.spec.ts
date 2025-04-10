import { Test, TestingModule } from '@nestjs/testing';
import { ZoomMeetingService } from './zoom_meeting.service';

describe('ZoomMeetingService', () => {
  let service: ZoomMeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZoomMeetingService],
    }).compile();

    service = module.get<ZoomMeetingService>(ZoomMeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
