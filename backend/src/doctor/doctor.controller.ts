/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './doctor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { Multer } from 'multer';


@Controller('doctor')
export class DoctorController {

  constructor(private readonly doctorService: DoctorService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  async create(
    @Request() req: { user: { id: number; } },
    @Body() doctorDto: DoctorDto,
    @UploadedFile() file?: Multer.File
  ) {
    console.log(doctorDto)
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is missing from token');
    }

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const doctor = await this.doctorService.create(doctorDto, userId, file?.path);

    return {
      success: true,
      message: 'Doctor created successfully',
      data: doctor,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/me')
  getProfile(@Request() req: { user: { id: number; } }) {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is missing from token');
    }
    return this.doctorService.findOneByUserId(userId);
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
