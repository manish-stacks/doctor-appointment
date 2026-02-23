/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class treatmentsDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  isActive?: boolean;
}

