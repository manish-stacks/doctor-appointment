/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, User, Hospital]),
    AuthModule,
  ],
  providers: [
    DoctorService,
    CloudinaryConfig, 
  ],
  controllers: [DoctorController],
})
export class DoctorModule {}
