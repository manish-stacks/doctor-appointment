import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospital')
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
    async createHospital(@Body() body: { name: string; }) {
        return this.hospitalService.createHospital(body.name);
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
