import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MedicineCategoryService } from './medicine_category.service';

@Controller('medicine-category')
export class MedicineCategoryController {

    constructor(private readonly medicineCategoryService: MedicineCategoryService) { }

    @Get()
    findAll() {
        return this.medicineCategoryService.findAll();
    }

    @Post()
    create(@Body() body: { name: string; }) {
        return this.medicineCategoryService.create(body.name);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.medicineCategoryService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: { name: string; }) {
        return this.medicineCategoryService.update(id, body.name);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.medicineCategoryService.delete(id);
    }
}
