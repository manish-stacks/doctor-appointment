/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CaseService } from './case.service';
import { CreateCaseDto } from './case.dto';

@Controller('case')
@UseGuards(JwtAuthGuard)
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() dto: CreateCaseDto) {
    return this.caseService.create(dto);
  }

  @Get('patient/:patientId')
  getPatientCases(@Param('patientId') patientId: number) {
    return this.caseService.findByPatient(patientId);
  }

  @Put(':id/close')
  close(@Param('id') id: number) {
    return this.caseService.closeCase(id);
  }
}
