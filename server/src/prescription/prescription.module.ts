import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './prescription.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription]), AuthModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule { }
