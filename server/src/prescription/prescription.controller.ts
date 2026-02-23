/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrescriptionService } from './prescription.service';
// import { CreatePrescriptionDto } from './prescription.dto';

@Controller('prescription')
@UseGuards(JwtAuthGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) { }

  @Post(':appointmentId')
  async createPrescription(
    @Param('appointmentId') appointmentId: number,
    @Body() body: any,
    @Request() req: { user: { id: number; }; }
  ) {
    return this.prescriptionService.create(appointmentId, body, req.user.id);
  }

  @Get('appointment/:id')
  async getPrescription(@Param('id') id: number) {
    return this.prescriptionService.getPrescription(id);
  }


  @Put(":id")
  update(@Param("id") id: number, @Body() body: any) {
    return this.prescriptionService.update(id, body);
  }


  @Get("appointment/:appointmentId")
  findByAppointment(@Param("appointmentId") appointmentId: number) {
    return this.prescriptionService.findByAppointment(appointmentId);
  }

  
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.prescriptionService.remove(id);
  }
  @Get('case/:caseId')
  getHistory(@Param('caseId') caseId: number) {
    return this.prescriptionService.getCaseHistory(caseId);
  }
}
