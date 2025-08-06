/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DoctorSubscriptionService } from './doctor_subscription.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('doctor-subscription')
export class DoctorSubscriptionController {
    constructor(private readonly doctorSubscriptionService: DoctorSubscriptionService) { }

    @Get()
    findAll() {
        return this.doctorSubscriptionService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    async getAllByDctor(@Request() req: { user: { doctor_id: number; } }) {
        const doctorId = req.user.doctor_id;
        return this.doctorSubscriptionService.getAllByDoctor(doctorId);
    }

    @Post()
    create(@Body() body: { userId: number; doctorId: number; }) {
        return this.doctorSubscriptionService.create(body.userId, body.doctorId);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.doctorSubscriptionService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: { userId: number; doctorId: number; }) {
        return this.doctorSubscriptionService.update(id, body.userId, body.doctorId);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.doctorSubscriptionService.delete(id);
    }
}
