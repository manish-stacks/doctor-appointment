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
export class DoctorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    categories: string;

    @IsString()
    @IsNotEmpty()
    treatments: string;

    @IsString()
    @IsNotEmpty()
    expertise: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    professionalBio: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    educations: EducationDto[];


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificateDto)
    certificates: CertificateDto[];


    @IsOptional()
    hospitalId: number;

    @IsOptional()
    hospitalName: string;
    @IsOptional()
    hospitalNumber: string;
    @IsOptional()
    hospitalFacility: string;
    @IsOptional()
    hospitalLocation: string;
    @IsOptional()
    hospitalAddress: string;



    @IsString()
    @IsNotEmpty()
    appointmentFees: string;

    @IsString()
    @IsOptional()
    experience: string;

    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsOptional()
    subscriptionStatus: number;

    @IsNumber()
    @IsOptional()
    isPopular: number;

    @IsString()
    @IsNotEmpty()
    timeSlots: number;


}


