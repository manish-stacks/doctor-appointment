/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber} from 'class-validator';


export class HospitalDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    facility: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsOptional()
    lat?: string;

    @IsString()
    @IsOptional()
    lng?: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;


}


