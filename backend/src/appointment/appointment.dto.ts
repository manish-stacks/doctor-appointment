/* eslint-disable prettier/prettier */

import { IsEmail, IsInt, IsPhoneNumber, IsString } from 'class-validator';

export class stepOneDto {
    @IsString()
    appointmentFor: string;
    @IsString()
    patientName: string;

    patientAge: string;

    illnessInfo: string;
    @IsPhoneNumber('IN')
    phoneNumber: string;
    @IsString()
    patientAddress: string;
    @IsString()
    sideEffects: string;
    @IsString()
    doctorNotes: string;

    @IsEmail()
    email: string;

    isInsured: string;
}

export class BookingPayload {
    @IsString()
    paymentType: string;
    @IsString()
    date: string;
    time: string;
    couponCode: string;
    email?: string;
    discountAmount: string;
    finalAmount: string;
    appointmentFees: string;
    images: string[];
}

export interface BookingMailPayload {
  appointmentId: string;
  patientName: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  appointmentFees: number;
  finalAmount: number;
  discountAmount?: number;
  paymentStatus: string;
  paymentType: string;
  doctorName?: string;
  hospitalName?: string;
  hospitalAddress?: string;
  transactionId?: string;
  cancelReason?: string;
  cancelBy?: string;
  refundAmount?: number;
  zoomUrl?: string;
}