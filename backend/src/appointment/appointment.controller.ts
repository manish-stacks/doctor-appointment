import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }


    @Get()
    async findAll() {
        return this.appointmentService.findAll();
    }

    @Post()
    async create(@Body() body: { doctorId: number; patientId: number; date: string; time: string; }) {
        return this.appointmentService.create(body.doctorId, body.patientId, body.date, body.time);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.appointmentService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { doctorId: number; patientId: number; date: string; time: string; status: string; }) {
        return this.appointmentService.update(body.doctorId, body.patientId, body.date, body.time, body
            .status);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.appointmentService.remove(id);
    }


}
