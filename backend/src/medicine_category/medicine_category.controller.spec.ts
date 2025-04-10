import { Test, TestingModule } from '@nestjs/testing';
import { MedicineCategoryController } from './medicine_category.controller';

describe('MedicineCategoryController', () => {
  let controller: MedicineCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineCategoryController],
    }).compile();

    controller = module.get<MedicineCategoryController>(MedicineCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
