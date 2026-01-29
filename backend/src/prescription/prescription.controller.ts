/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './prescription.dto';

@Controller('prescription')
@UseGuards(JwtAuthGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  add(@Body() dto: CreatePrescriptionDto, @Request() req) {
    return this.prescriptionService.create(req.user.id, dto);
  }

  @Get('case/:caseId')
  getHistory(@Param('caseId') caseId: number) {
    return this.prescriptionService.getCaseHistory(caseId);
  }
}
