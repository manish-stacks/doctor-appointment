import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
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
  ) {}

  async findAll(): Promise<ResponseFormat> {
    try {
      const treatments = await this.treatmentsRepository.find({
        relations: ['category'],
      });

      return {
        success: true,
        message: 'Treatments retrieved successfully',
        data: treatments,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve treatments',
        error: error.message,
      });
    }
  }

  async create(treatmentsDto: treatmentsDto): Promise<ResponseFormat> {
    try {
      // Validate input data
      if (!treatmentsDto.name || treatmentsDto.name.trim() === '') {
        throw new BadRequestException({
          success: false,
          message: 'Treatment name is required',
        });
      }

      if (
        treatmentsDto.category === undefined ||
        treatmentsDto.category === null
      ) {
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
        where: { id: treatmentsDto.category },
      });

      if (!category) {
        throw new NotFoundException({
          success: false,
          message: `Category with ID ${treatmentsDto.category} not found`,
        });
      }

      // Create and save the treatment
      const treatment = this.treatmentsRepository.create({
        name: treatmentsDto.name,
        isActive:
          treatmentsDto.isActive !== undefined ? treatmentsDto.isActive : true,
        category: category,
      });

      const savedTreatment = await this.treatmentsRepository.save(treatment);

      return {
        success: true,
        message: 'Treatment created successfully',
        data: savedTreatment,
      };
    } catch (error) {
      // If error is already formatted by us, just throw it again
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // Otherwise wrap in internal error
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to create treatment',
        error: error.message,
      });
    }
  }

  async findOne(id: number): Promise<ResponseFormat> {
    try {
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve treatment',
        error: error.message,
      });
    }
  }

  update(id: number, name: string) {
    return this.treatmentsRepository.update(id, { name });
  }

  async delete(id: number): Promise<ResponseFormat> {
    try {
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to delete treatment',
        error: error.message,
      });
    }
  }

  async toggleStatus(id: number): Promise<ResponseFormat> {
    try {
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
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to toggle treatment status',
        error: error.message,
      });
    }
  }
}
