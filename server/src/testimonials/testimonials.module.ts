/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Testimonial } from './testimonial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialService } from './testimonials.service';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { AuthModule } from 'src/auth/auth.module';
import { TestimonialController } from './testimonials.controller.spec';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial]), AuthModule],
  controllers: [TestimonialController],
  providers: [TestimonialService, CloudinaryConfig]
})
export class TestimonialsModule { }
