/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
import { CreateTestimonialDto } from './testimonial.dto';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialRepository: Repository<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto, filePath?: string) {
    if (filePath) {
      const result = await uploadToCloudinary(filePath);
      dto['image'] = result.secure_url;
    }

    const testimonial = this.testimonialRepository.create(dto);
    return this.testimonialRepository.save(testimonial);
  }

  async findAll() {
    return this.testimonialRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number) {
    const testimonial = await this.testimonialRepository.findOne({ where: { id } });
    if (!testimonial) throw new NotFoundException('Not found');
    return this.testimonialRepository.remove(testimonial);
  }
}
