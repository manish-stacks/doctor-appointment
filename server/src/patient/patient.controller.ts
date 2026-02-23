/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UseGuards,
    Res
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './patient.dto';
import { Response } from 'express';

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

    @Get('my-patients')
    myPatients(
        @Request() req: { user: { id: number } },
        @Query('search') search?: string
    ) {
        return this.patientService.findMyPatients(req.user.id, search);
    }

    @Get('export')
    async exportPatients(
        @Query('type') type: 'csv' | 'pdf',
        @Query('search') search: string,
        @Res() res: Response,
        @Request() req: { user: { id: number } },
    ) {
        if (type === 'csv') {
            const csv = await this.patientService.exportCSV(req.user.id, search);

            res.header('Content-Type', 'text/csv');
            res.attachment('patients.csv');
            return res.send(csv);
        }

        if (type === 'pdf') {
            const pdfBuffer = await this.patientService.exportPDF(req.user.id, search);

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=patients.pdf',
                'Content-Length': pdfBuffer.length,
            });

            return res.end(pdfBuffer);
        }

        return res.status(400).json({
            message: 'Invalid export type',
        });
    }



}
