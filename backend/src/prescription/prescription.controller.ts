import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';

@Controller('prescription')
export class PrescriptionController {

    constructor(private readonly prescriptionService: PrescriptionService) { }


    @Get()
    async findAll() {
        return this.prescriptionService.findAll();
    }
    @Post()
    async create(@Body() body: { appointmentId: number, doctorId: number, userId: number, medicines: string, pdf: string }) {
        return this.prescriptionService.create(body.appointmentId, body.doctorId, body.userId, body.medicines, body.pdf);
    }

    @Get(':id')
    async findOne(@Param('id') id: number, ) {
        return this.prescriptionService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { appointmentId: number, doctorId: number, userId: number, medicines: string, pdf: string }) {
        return this.prescriptionService.update(id, body.appointmentId, body.doctorId, body.userId, body.medicines, body.pdf);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.prescriptionService.delete(id);
    }
}
