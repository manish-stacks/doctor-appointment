/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  CreateUserDto,
  LoginDto,
  resendOtpDto,
  VerifyOtpDto,
} from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('resend')
  resend(@Body() resendOtpDto: resendOtpDto) {
    return this.authService.resendOtp(resendOtpDto);
  }
  @Post('verify-otp')
  verifyOtp(@Body() VerifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(VerifyOtpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      id: req.user.id,
      username: req.user.username,
      image: req.user.image,
      phone: req.user.phone,
     
    };
  }
}
