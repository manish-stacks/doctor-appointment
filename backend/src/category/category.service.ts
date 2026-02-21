/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './category.dto';

import { deleteFromCloudinary, uploadToCloudinary } from 'src/helper/cloudinary.helper';
// import { uploadImage } from '../config/cloudinary.config'; 
@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto, filePath?: string): Promise<Category> {
        if (filePath) {
            const result = await uploadToCloudinary(filePath);
            createCategoryDto.image = result.secure_url;
        }
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }


    // async findAll() {
    //     return this.categoryRepository.find({select: {id: true, name: true, image: true, isActive: true,icon: true}});
    // }

    async findAll() {
        const categories = await this.categoryRepository
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.doctors', 'doctor')
            .loadRelationCountAndMap(
                'category.doctorCount',
                'category.doctors'
            )
            .select([
                'category.id',
                'category.name',
                'category.image',
                'category.icon',
                'category.isActive',
                'category.slug'
            ])
            .getMany();

        return categories;
    }


    async findOne(id: number) {
        return this.categoryRepository.findOne({ where: { id } });
    }




    async update(id: number, createCategoryDto: Category, filePath?: string) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');

        if (filePath) {
            if (category.image) {
                await deleteFromCloudinary(category.image);
            }
            const uploadResult = await uploadToCloudinary(filePath);
            category.image = uploadResult.secure_url;
        }
        category.name = createCategoryDto.name;
        return this.categoryRepository.save(category);
    }
    async fdfad(id: number, category: { name: string; image: string; treatmentId: number; isActive: boolean; }) {
        const categoryToUpdate = await this.categoryRepository.findOne({ where: { id } });
        if (!categoryToUpdate) return 'Category not found';
        else {
            categoryToUpdate.name = category.name;
            categoryToUpdate.image = category.image;
            // categoryToUpdate.treatmentId = category.treatmentId;
            categoryToUpdate.isActive = category.isActive;
            return this.categoryRepository.save(categoryToUpdate);
        }
    }

    async delete(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) return 'Category not found';
        await deleteFromCloudinary(category.image);
        return this.categoryRepository.remove(category);
    }
}
