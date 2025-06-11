/* eslint-disable prettier/prettier */ 

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { treatmentsDto } from './treatments.dto';

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Get()
  findAll() {
    return this.treatmentsService.findAll();
  }

  @Post()
  create(@Body() treatmentsDto: treatmentsDto) {
    return this.treatmentsService.create(treatmentsDto);
  }
  @Get('category/:id')
  async findTreatmentsByCategory(@Param('id', ParseIntPipe) id: number) {
    const treatments = await this.treatmentsService.findTreatmentsByCategory(id);
    
    return {
      success: true,
      message: 'Treatments retrieved successfully',
      data: treatments,
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.treatmentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { name: string }) {
    return this.treatmentsService.update(id, body.name);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.treatmentsService.delete(id);
  }

  @Patch(':id/toggle-status')
  toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.treatmentsService.toggleStatus(id);
  }
}
