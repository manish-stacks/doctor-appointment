import { Test, TestingModule } from '@nestjs/testing';
import { VideocallHistoryService } from './videocall_history.service';

describe('VideocallHistoryService', () => {
  let service: VideocallHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideocallHistoryService],
    }).compile();

    service = module.get<VideocallHistoryService>(VideocallHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
