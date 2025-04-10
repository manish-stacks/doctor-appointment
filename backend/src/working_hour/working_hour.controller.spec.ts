import { Test, TestingModule } from '@nestjs/testing';
import { WorkingHourController } from './working_hour.controller';

describe('WorkingHourController', () => {
  let controller: WorkingHourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingHourController],
    }).compile();

    controller = module.get<WorkingHourController>(WorkingHourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
