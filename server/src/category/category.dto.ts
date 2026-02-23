/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
