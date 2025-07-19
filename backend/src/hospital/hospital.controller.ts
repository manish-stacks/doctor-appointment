/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalDto } from './hospital.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('hospital')
export class HospitalController {

    constructor(private readonly hospitalService: HospitalService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
     getHospitals(@Request() req: { user: { id: number; } }) {
        const userId = req.user.id;
        if (userId) {
            return this.hospitalService.getHospitalsWithUserExtras(userId);
        } else {
            // Not logged in: only public
            return this.hospitalService.getPublicHospitals();
        }
    }

    @Get(':id')
    async getHospital(@Param('id') id: number) {
        return this.hospitalService.getHospital(id);
    }

    @Get('myHospitals/:userId')
    async getHospitalsByUser(@Param('userId') userId: number) {
        return this.hospitalService.getHospitalsByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createHospital(@Body() hospitalDto: HospitalDto) {
        return this.hospitalService.createHospital(hospitalDto);
    }

    @Put(':id')
    async updateHospital(@Param('id') id: number, @Body() body: { name: string; }) {
        return this.hospitalService.updateHospital(id, body.name);
    }

    @Delete(':id')
    async deleteHospital(@Param('id') id: number) {
        return this.hospitalService.deleteHospital(id);
    }
}
