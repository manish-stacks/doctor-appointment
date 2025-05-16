/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  create(@Request() req:{ user: { id: number; }}, @Body() doctorDto: DoctorDto) {
    const userId = req.user.id;
    return this.doctorService.create(doctorDto, userId);
  }

  @Get()
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
