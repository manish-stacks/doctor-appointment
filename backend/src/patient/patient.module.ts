/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule { }
