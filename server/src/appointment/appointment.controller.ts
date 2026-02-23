/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentCreateDto } from 'src/doctor/doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingPayload, stepOneDto } from './appointment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    async create(@Body() body: AppointmentCreateDto, @Request() req: { user: { id: number; }; }) {
        return this.appointmentService.create(body, req.user.id);
    }

    @Post('follow-up')
    @UseGuards(JwtAuthGuard)
    createFollowUp(@Body() body: { caseId: number; patientId: number; doctorId: number }) {
        return this.appointmentService.createFollowUp(body);
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


    @UseGuards(JwtAuthGuard)
    @Post(':id/step1')
    updateStep1(
        @Param('id') id: number,
        @Body() body: stepOneDto,
        @Request() req: { user: { id: number; }; }
    ) {
        return this.appointmentService.updateStep1(id, body, req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Post(':id/complete-booking')
    @UseInterceptors(FilesInterceptor('reportImage', 5, multerOptions))
    updateBooking(
        @Param('id') id: number,
        @Body() body: BookingPayload,
        @UploadedFiles() files: Multer.File[]
    ) {

        const paths = files?.length ? files.map(f => f.path) : [];
        return this.appointmentService.updateBooking(id, body, paths);
    }


    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { doctorId: number; patientId: number; date: string; time: string; status: string; }) {
        return this.appointmentService.update(body.doctorId, body.patientId, body.date, body.time, body
            .status);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/status')
    async updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
        return this.appointmentService.updateStatus(id, body.status);
    }
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.appointmentService.remove(id);
    }


    @UseGuards(JwtAuthGuard)
    @Post('patient/appointments')
    async patientAppointments(
        @Request() req: { user: { id: number; } },
        @Body() body: { page: number; limit: number; search: string }
    ) {
        return this.appointmentService.patientAppointments(
            req.user.id,
            body.page || 1,
            body.limit || 10,
            body.search || ''
        );
    }


    @UseGuards(JwtAuthGuard)
    @Post('doctor/appointments')
    async doctorAppointments(
        @Request() req: { user: { id: number; } },
        @Body() body: { page: number; limit: number; search: string, patientId: number }
    ) {
        return this.appointmentService.doctorAppointments(
            req.user.id,
            body.page || 1,
            body.limit || 10,
            body.search || '',
            body.patientId
        );
    }


    @Patch(':id/mark-paid')
    async markAsPaid(@Param('id') id: number) {
        return this.appointmentService.markAsPaid(id);
    }

    // admin routes
    @Post('list')
    getAppointments(@Body() body: any) {
        return this.appointmentService.getAppointmentsForAdmin(body);
    }

    @Put(':id/status')
    updateAdminStatus(
        @Param('id') id: number,
        @Body('status') status: string,
    ) {
        return this.appointmentService.updateStatus(id, status);
    }

    @Put(':id/mark-paid')
    markPaid(@Param('id') id: number) {
        return this.appointmentService.markAsPaid(id);
    }

}
