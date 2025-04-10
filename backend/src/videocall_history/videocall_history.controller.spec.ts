import { Test, TestingModule } from '@nestjs/testing';
import { VideocallHistoryController } from './videocall_history.controller';

describe('VideocallHistoryController', () => {
  let controller: VideocallHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideocallHistoryController],
    }).compile();

    controller = module.get<VideocallHistoryController>(VideocallHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
