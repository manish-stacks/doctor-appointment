/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() doctorDto: DoctorDto) {
    return this.doctorService.create(doctorDto);
  }

  @Get('/hh')
  async findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() doctorDto: DoctorDto) {
    return this.doctorService.update(id, doctorDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.doctorService.remove(id);
  }
}
