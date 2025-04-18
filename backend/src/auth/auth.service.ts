import { LoginDto } from './../user/user.dto';
/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { CreateUserDto, resendOtpDto, VerifyOtpDto } from 'src/user/user.dto';
import { otp_generator } from 'utils/OtpGenerate';
import { MailerUtil } from 'utils/SendEmail';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private mailerUtil: MailerUtil,
  ) { }

  /* eslint-disable prettier/prettier */
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, gender, phone, role } = createUserDto;

    if (!username || !phone) {
      throw new BadRequestException('Username and phone are required.');
    }

    const formattedUsername = username.replace(/\s+/g, '+');

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const backgroundColor = getRandomColor();
    const textColor = getRandomColor();

    const existingUser = await this.userRepo.findOne({ where: { phone } });

    if (existingUser) {
      if (!existingUser?.contact_number_verified) {
        // Generate a new OTP and expiry time
        const otp = otp_generator();
        const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);
        existingUser.otp = otp;
        existingUser.otp_expires_at = otpExpireTime;

        await this.userRepo.save(existingUser);

        // Send OTP to the user
        // await this.sendOtp(phone, otp);

        throw new ConflictException(
          'Phone number already exists but not verified. OTP has been sent again.',
        );
      }
      throw new ConflictException(
        'Phone number already exists and is verified.',
      );
    }

    // Generate OTP and expiry time for new registration
    const otp = otp_generator();
    const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

    // Set the avatar URL with random colors
    const avatar = `https://ui-avatars.com/api/?name=${formattedUsername}&background=${backgroundColor}&color=${textColor}`;

    createUserDto.otp = otp;
    createUserDto.otp_expires_at = otpExpireTime;
    createUserDto.gender = gender === 'MR' ? 'Male' : 'Female';
    createUserDto.image = avatar;
    createUserDto.role = role;
    createUserDto.contact_number_verified = false;

    const user = this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(user);

    // Send OTP to the user
    // await this.sendOtp(phone, otp);

    console.log('OTP Expire Time:', otpExpireTime);

    return savedUser;
  }

  async verifyOtp(VerifyOtpDto: VerifyOtpDto): Promise<{
    success: boolean;
    message: string;
    token?: string;
    role: string;
    user: object;
  }> {
    try {
      const { phone, otp, type = 'register' } = VerifyOtpDto;
      const user = await this.userRepo.findOne({ where: { phone } });

      if (!user) {
        return {
          success: false,
          message: 'User not found.',
          role: '',
          user: {},
        };
      }

      const currentTime = new Date();

      const storedOtp = type === 'login' ? user.login_otp : user.otp;
      const otpExpiresAt =
        type === 'login' ? user.otp_expires_at : user.otp_expires_at;

      if (storedOtp !== Number(otp)) {
        return { success: false, message: 'Invalid OTP.', role: '', user: {} };
      }

      if (otpExpiresAt < currentTime) {
        return {
          success: false,
          message: 'OTP has expired.',
          role: '',
          user: {},
        };
      }

      // Reset OTP and OTP send count upon successful verification
      if (type === 'login') {
        user.login_otp = 0;
        user.HowManyOtpSend = 0;
      } else {
        user.otp = 0;
        user.HowManyOtpSend = 0;
        user.contact_number_verified = true;
      }

      await this.userRepo.save(user);

      const payload = {
        id: user.id,
        username: user.username,
        phone: user.phone,
        image: user.image,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      const send_user = {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        image: user.image,
        role: user.role,
        doctor_id: user?.doctor_id,
        contact_number_verified: user?.contact_number_verified,
      };

      return {
        success: true,
        message: 'OTP verified successfully.',
        token,
        role: user.role,
        user: send_user,
      };
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return {
        success: false,
        message: 'Something went wrong during OTP verification.',
        role: '',
        user: {},
      };
    }
  }

  async resendOtp(
    resendOtpDto: resendOtpDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const { phone, type = 'register' } = resendOtpDto;
      const user = await this.userRepo.findOne({ where: { phone } });
      console.log('HowManyOtpSend:', user?.HowManyOtpSend);

      if (!user) {
        return {
          success: false,
          message:
            'No account found with this phone. Please check and try again.',
        };
      }

      if (user.HowManyOtpSend && user.HowManyOtpSend >= 3) {
        return {
          success: false,
          message:
            'You have reached the maximum limit for OTP requests. Please wait a while before trying again.',
        };
      }

      const otp = otp_generator();
      const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

      console.log('otpExpireTime', otpExpireTime);

      // Increment OTP send count
      user.HowManyOtpSend = (user.HowManyOtpSend || 0) + 1;

      // Check the type and save the OTP accordingly
      if (type === 'login') {
        user.login_otp = otp;
        user.otp_expires_at = otpExpireTime;
      } else if (type === 'register') {
        user.otp = otp;
        user.otp_expires_at = otpExpireTime;
      }

      await this.userRepo.save(user);

      return {
        success: true,
        message: `A new OTP has been sent to your phone for ${type}. Please check your messages.`,
      };
    } catch (error) {
      console.error('Error during OTP resend:', error);
      return {
        success: false,
        message:
          'An error occurred while resending the OTP. Please try again later.',
      };
    }
  }

  async login(
    LoginDto: LoginDto,
  ): Promise<{ success: boolean; message: string;}> {
    const { phone } = LoginDto;

    if (!phone) {
      throw new BadRequestException('Phone Number are required.');
    }

    const user = await this.userRepo.findOne({ where: { phone } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const otp = otp_generator();
    const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

    if (user) {
      user.login_otp = otp;
      user.otp_expires_at = otpExpireTime;
    }
    await this.userRepo.save(user);

    return {
      success: true,
      message: 'Login otp send  successful on phone number.'
    };
  }
}
