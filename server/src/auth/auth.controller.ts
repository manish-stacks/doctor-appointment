/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request, Req, Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  CreateUserDto,
  LoginDto,
  resendOtpDto,
  VerifyOtpDto,
} from 'src/user/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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

  @Post('login-email')
  loginWithEmail(@Body() body: { email: string, password: string, role: string }) {
    return this.authService.loginWithEmail(body);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: { id: number; username: string; image: string; phone: string } }) {
    return {
      id: req.user.id,
      username: req.user.username,
      image: req.user.image,
      phone: req.user.phone,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: { user: { token: string; } }, @Res() res) {
    const { token } = req.user;
    const url = `${process.env.FRONTEND_URL}/google-success?token=${token}`
    return res.redirect(url);
  }

}
