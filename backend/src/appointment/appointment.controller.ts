/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { doctorDtoCreate } from 'src/doctor/doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Get()
    async findAll() {
        return this.appointmentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: doctorDtoCreate) {
        return this.appointmentService.create(body);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.appointmentService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':appointmentId/booking')
    async findByAppointmentId(@Param('appointmentId') appointmentId: string) {
        return this.appointmentService.findByAppointmentId(appointmentId);
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
