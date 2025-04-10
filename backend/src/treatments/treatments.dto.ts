import { IsNumber, IsOptional, IsString } from 'class-validator';

export class treatmentsDto {
  @IsString()
  name: string;

  @IsNumber()
  category: number;

  @IsOptional()
  isActive?: boolean;
}


export class updateDto {
    @IsString()
    name: string;
  
    @IsNumber()
    category: number;
  
    @IsOptional()
    isActive?: boolean;
}
