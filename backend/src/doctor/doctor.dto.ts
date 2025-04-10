/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class DoctorDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

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

    @IsNumber()
    @IsNotEmpty()
    hospitalId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsOptional()
    desc: string;

    @IsString()
    education: string;

    @IsString()
    certificate: string;


    @IsNumber()
    appointmentFees: string;

    @IsString()
    @IsOptional()
    experience: string;

    @IsString()
    @IsOptional()
    timeSlot: string;

    @IsString()
    @IsNotEmpty()
    dob: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    since: string;

    @IsNumber()
    @IsNotEmpty()
    isActive: number;

    @IsNumber()
    @IsOptional()
    subscriptionStatus: number;

    @IsNumber()
    @IsOptional()
    isPopular: number;

    @IsNumber()
    @IsOptional()
    customTimeSlot: number;

    @IsNumber()
    @IsOptional()
    patientVideoCall: number;
}


