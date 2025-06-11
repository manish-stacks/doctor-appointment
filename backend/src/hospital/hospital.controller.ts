/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalDto } from './hospital.dto';

@Controller('hospitals')
export class HospitalController {

    constructor(private readonly hospitalService: HospitalService) { }


    @Get()
    async getHospitals() {
        return this.hospitalService.getHospitals();
    }

    @Get(':id')
    async getHospital(@Param('id') id: number) {
        return this.hospitalService.getHospital(id);
    }

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
