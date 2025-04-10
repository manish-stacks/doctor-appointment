import { Module } from '@nestjs/common';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatments } from './treatments.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatments ,Category])],
  controllers: [TreatmentsController],
  providers: [TreatmentsService]
})
export class TreatmentsModule { }
