/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { multerOptions } from 'src/config/multer.config';


@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @Get()
    async findAll() {
        const categories = await this.categoryService.findAll();
        return {
            success: true,
            message: 'Categories fetched successfully',
            data: categories,
        };
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @UploadedFile() file?: Multer.File
    ) {
        if (!file) {
            throw new Error('No file uploaded');
        }
        const category = await this.categoryService.create(createCategoryDto, file.path);
        return {
            success: true,
            message: 'Category created successfully',
            data: category,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const category = await this.categoryService.findOne(id);
        return {
            success: true,
            message: 'Category fetched successfully',
            data: category,
        }
    }



    @Put(':id')
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async update(
        @Param('id') id: number,
        @Body() createCategoryDto: Category,
        @UploadedFile() file?: Multer.File
    ) {
        const updatedUser = await this.categoryService.update(id, createCategoryDto, file?.path);
        return {
            success: true,
            message: 'Category updated successfully',
            data: updatedUser,
        };

    }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        const deletedUser = await this.categoryService.delete(id);
        return {
            success: true,
            message: 'Category deleted successfully',
            data: deletedUser,
        }
    }
}
