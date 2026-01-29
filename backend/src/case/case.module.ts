/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CaseFile } from './case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseFile]), AuthModule],

  controllers: [CaseController],
  providers: [CaseService]
})
export class CaseModule { }
