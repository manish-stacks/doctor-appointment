import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) { }

    @Get()
    async findAll() {
        return this.medicineService.findAll();
    }


    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.medicineService.findOne(id);
    }

    @Post()
    async create(@Body() body: { name: string; }) {
        return this.medicineService.create(body.name);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() body: { name: string; }) {
        return this.medicineService.update(id, body.name);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.medicineService.remove(id);
    }
}
