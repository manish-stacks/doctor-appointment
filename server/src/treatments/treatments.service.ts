/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Treatments } from './treatments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { treatmentsDto } from './treatments.dto';
import { Category } from 'src/category/category.entity';

export interface ResponseFormat {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatments)
    private readonly treatmentsRepository: Repository<Treatments>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async findAll(): Promise<ResponseFormat> {

    const treatments = await this.treatmentsRepository.find({
      relations: ['category'],
    });

    return {
      success: true,
      message: 'Treatments retrieved successfully',
      data: treatments,
    };

  }

  async create(treatmentsDto: treatmentsDto): Promise<ResponseFormat> {

    if (!treatmentsDto.name || treatmentsDto.name.trim() === '') {
      throw new BadRequestException({
        success: false,
        message: 'Treatment name is required',
      });
    }

    if (!treatmentsDto.categoryId) {
      throw new BadRequestException({
        success: false,
        message: 'Category is required',
      });
    }

    // Check if treatment with same name already exists
    const existingTreatment = await this.treatmentsRepository.findOne({
      where: { name: treatmentsDto.name },
    });

    if (existingTreatment) {
      throw new BadRequestException({
        success: false,
        message: `Treatment with name "${treatmentsDto.name}" already exists`,
      });
    }

    // Find the category
    const category = await this.categoryRepository.findOne({
      where: { id: treatmentsDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException({
        success: false,
        message: `Category with ID ${treatmentsDto.categoryId} not found`,
      });
    }

    // Create and save the treatment
    const treatment = this.treatmentsRepository.create({
      name: treatmentsDto.name,
      isActive: treatmentsDto.isActive ? treatmentsDto.isActive : false,
      category: { id: treatmentsDto.categoryId },
    });

    const savedTreatment = await this.treatmentsRepository.save(treatment);

    return {
      success: true,
      message: 'Treatment created successfully',
      data: savedTreatment,
    };

  }


  async findTreatmentsByCategory(categoryId: number): Promise<Treatments[]> {
    return await this.treatmentsRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }
  async findOne(id: number): Promise<ResponseFormat> {

    if (!id || isNaN(id)) {
      throw new BadRequestException({
        success: false,
        message: 'Valid treatment ID is required',
      });
    }

    const treatment = await this.treatmentsRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!treatment) {
      throw new NotFoundException({
        success: false,
        message: `Treatment with ID ${id} not found`,
      });
    }

    return {
      success: true,
      message: 'Treatment retrieved successfully',
      data: treatment,
    };

  }

  update(id: number, name: string) {
    return this.treatmentsRepository.update(id, { name });
  }

  async delete(id: number): Promise<ResponseFormat> {

    if (!id || isNaN(id)) {
      throw new BadRequestException({
        success: false,
        message: 'Valid treatment ID is required',
      });
    }

    // Check if treatment exists
    const treatment = await this.treatmentsRepository.findOne({
      where: { id },
    });

    if (!treatment) {
      throw new NotFoundException({
        success: false,
        message: `Treatment with ID ${id} not found`,
      });
    }

    // Delete the treatment
    await this.treatmentsRepository.delete(id);

    return {
      success: true,
      message: 'Treatment deleted successfully',
    };

  }

  async toggleStatus(id: number): Promise<ResponseFormat> {

    if (!id || isNaN(id)) {
      throw new BadRequestException({
        success: false,
        message: 'Valid treatment ID is required',
      });
    }

    // Check if treatment exists
    const treatment = await this.treatmentsRepository.findOne({
      where: { id },
    });

    if (!treatment) {
      throw new NotFoundException({
        success: false,
        message: `Treatment with ID ${id} not found`,
      });
    }

    // Toggle the status
    treatment.isActive = !treatment.isActive;
    await this.treatmentsRepository.save(treatment);

    return {
      success: true,
      message: `Treatment status ${treatment.isActive ? 'activated' : 'deactivated'} successfully`,
      data: treatment,
    };
  }
}
