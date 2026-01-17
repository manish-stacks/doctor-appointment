/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentCreateDto } from 'src/doctor/doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { stepOneDto } from './appointment.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { Multer } from 'multer';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Get()
    async findAll() {
        return this.appointmentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: AppointmentCreateDto) {
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


    @Post(':id/step1')
    updateStep1(
        @Param('id') id: number,
        @Body() body: stepOneDto,
    ) {
        return this.appointmentService.updateStep1(id, body);
    }


    @Post(':id/complete-booking')
    @UseInterceptors(FilesInterceptor('reportImage', 5, multerOptions))
    updateBooking(
        @Param('id') id: number,
        @Body() body: stepOneDto,
        @UploadedFiles() files: Multer.File[]
    ) {
        const paths = files.map(f => f.path);
        return this.appointmentService.updateBooking(id, body, paths);
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
