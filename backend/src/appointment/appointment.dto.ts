/* eslint-disable prettier/prettier */

import { IsString } from 'class-validator';


export class stepOneDto {
    @IsString()
    appointmentFor: string;
    @IsString()
    patientName: string;

    patientAge: string;
    illnessInfo: string;
    phoneNumber: string;
    @IsString()
    address: string;
    @IsString()
    sideEffects: string;
    @IsString()
    doctorNotes: string;
    isInsured: string;
    images?: string[];

    date?: string;
    time?: string;
}