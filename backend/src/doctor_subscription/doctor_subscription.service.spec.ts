import { Test, TestingModule } from '@nestjs/testing';
import { DoctorSubscriptionService } from './doctor_subscription.service';

describe('DoctorSubscriptionService', () => {
  let service: DoctorSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorSubscriptionService],
    }).compile();

    service = module.get<DoctorSubscriptionService>(DoctorSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
