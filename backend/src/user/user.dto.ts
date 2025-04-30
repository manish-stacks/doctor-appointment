/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';


export class CreateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(50, { message: 'Email cannot be longer than 50 characters' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username cannot be longer than 50 characters' })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @MaxLength(255, { message: 'Phone number cannot be longer than 255 characters' })
  phone: string;

  @IsOptional()
  @IsDate()
  @MaxLength(255, { message: 'Date of birth must not exceed 255 characters' })
  dob?: string;

  @IsOptional()
  @IsBoolean()
  @MaxLength(1, { message: 'Active status must be either 0 or 1' })
  active?: boolean;

  @IsOptional()
  image: string;


  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role:string

  @IsOptional()
  @IsNumber()
  @MaxLength(6, { message: 'Otp Cannot be longer than 6 Digit' })
  otp?: number;

  @IsOptional()
  @IsNumber()
  @MaxLength(6, { message: 'Otp Cannot be longer than 6 Digit' })
  login_otp?: number;

  @IsOptional()
  otp_expires_at?: Date;

  @IsOptional()
  HowManyOtpSend?: number;

  @IsOptional()
  @IsBoolean()
  contact_number_verified: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Gender cannot be longer than 255 characters' })
  gender?: string;
}

export class LoginDto {
  @IsNumber({}, { message: 'Invalid Phone Number format' })
  @IsNotEmpty({ message: 'Conatct Number is required' })
  phone: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Role is required' })
  role: string;
}

export class resendOtpDto {
  @IsNotEmpty({ message: 'Phone Number is required' })
  phone: string;
  type: string;
}

export class VerifyOtpDto {
  @IsNumber({}, { message: 'Invalid Phone Number format' })
  @IsNotEmpty({ message: 'Phone Number is required' })
  phone: string;
  type: string;
  @IsNotEmpty({ message: 'OTP is required' })
  otp: number;
}
