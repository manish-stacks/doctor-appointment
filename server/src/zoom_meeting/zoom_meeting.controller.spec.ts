import { Test, TestingModule } from '@nestjs/testing';
import { ZoomMeetingController } from './zoom_meeting.controller';

describe('ZoomMeetingController', () => {
  let controller: ZoomMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoomMeetingController],
    }).compile();

    controller = module.get<ZoomMeetingController>(ZoomMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
