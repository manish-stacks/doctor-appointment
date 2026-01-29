/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './patient.dto';

@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Get()
    myPatient(
        @Request() req: { user: { id: number; } },
        @Query('relation') relation: string,
    ) {
        return this.patientService.findMyPatient(req.user.id, relation);
    }

    @Post()
    addPatient(@Body() dto: CreatePatientDto, @Request() req: { user: { id: number; }; }) {
        return this.patientService.create(req.user.id, dto);
    }

    @Get('my-family')
    myFamily(@Request() req: { user: { id: number; }; }) {
        return this.patientService.findMyPatients(req.user.id);
    }


}
