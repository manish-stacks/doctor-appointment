/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';


class EducationDto {
    @IsString()
    degree: string;

    @IsString()
    institution: string;

    @IsString()
    year: string;
}

class CertificateDto {
    @IsString()
    name: string;

    @IsString()
    year: string;
}


class UserDto {
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

}
export class DoctorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    treatmentId: string;

    @IsString()
    @IsNotEmpty()
    expertise: string;

    @IsString()
    @IsNotEmpty()
    hospitalId: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    desc?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    education: EducationDto[];


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificateDto)
    certificate: CertificateDto[];

    @IsString()
    @IsOptional()
    appointmentFees?: string;

    @IsString()
    @IsOptional()
    experience?: string;

    @IsString()
    @IsNotEmpty()
    timeSlot: string;

    @IsString()
    @IsNotEmpty()
    dob: string;


    @IsString()
    @IsNotEmpty()
    gender: string;


    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;


    @IsNumber()
    @IsOptional()
    isPopular?: number;


}


