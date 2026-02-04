/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
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
    getFamily(
        @Request() req: { user: { id: number; } },
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search: string,
    ) {
        const patientId = req.user.id;
        return this.patientService.findAll(patientId, page, limit, search);
    }

   
    @Put('my-family/:id')
    updateFamily(@Param('id') id: number, @Body() dto: CreatePatientDto) {
        return this.patientService.update(id, dto);
    }

    @Delete('my-family/:id')
    deleteFamily(@Param('id') id: number) {
        return this.patientService.remove(id);
    }


}
