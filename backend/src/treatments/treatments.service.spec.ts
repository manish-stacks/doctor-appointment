import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Treatments } from './treatments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { treatmentsDto } from './treatments.dto';
import { Category } from 'src/category/category.entity';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatments)
    private readonly treatmentsRepository: Repository<Treatments>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.treatmentsRepository.find({ relations: ['category'] });
  }

  async create(treatmentsDto: treatmentsDto) {
    const category = await this.categoryRepository.findOne({ where: { id: treatmentsDto.category } });
    if (!category) {
      throw new Error('Category not found');
    }

    const treatment = this.treatmentsRepository.create({
      name: treatmentsDto.name,
      isActive: treatmentsDto.isActive,
      category,
    });

    return this.treatmentsRepository.save(treatment);
  }

  findOne(id: number) {
    return this.treatmentsRepository.findOne({ where: { id }, relations: ['category'] });
  }

  update(id: number, name: string) {
    return this.treatmentsRepository.update(id, { name });
  }

  delete(id: number) {
    return this.treatmentsRepository.delete(id);
  }
}
