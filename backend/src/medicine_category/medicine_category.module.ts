import { Module } from '@nestjs/common';
import { MedicineCategoryController } from './medicine_category.controller';
import { MedicineCategoryService } from './medicine_category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineCategory } from './medicine_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineCategory])],
  controllers: [MedicineCategoryController],
  providers: [MedicineCategoryService]
})
export class MedicineCategoryModule {}
