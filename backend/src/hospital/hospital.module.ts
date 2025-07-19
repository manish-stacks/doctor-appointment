/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospital.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital]),
    AuthModule
  ],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule { }
