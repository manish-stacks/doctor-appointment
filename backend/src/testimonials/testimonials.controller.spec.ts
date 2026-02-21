/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTestimonialDto } from './testimonial.dto';
import { TestimonialService } from './testimonials.service';
import { multerOptions } from 'src/config/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Multer } from 'multer';

@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @Body() dto: CreateTestimonialDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.testimonialService.create(dto, file?.path);
  }

  @Get()
  findAll() {
    return this.testimonialService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testimonialService.remove(id);
  }
}
