import { Test, TestingModule } from '@nestjs/testing';
import { DoctorSubscriptionController } from './doctor_subscription.controller';

describe('DoctorSubscriptionController', () => {
  let controller: DoctorSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorSubscriptionController],
    }).compile();

    controller = module.get<DoctorSubscriptionController>(DoctorSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
