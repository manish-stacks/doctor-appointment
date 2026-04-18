/* eslint-disable prettier/prettier */
import { LoginDto } from './../user/user.dto';
import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { CreateUserDto, resendOtpDto, VerifyOtpDto } from 'src/user/user.dto';
import { otp_generator } from 'utils/OtpGenerate';
import { MailerUtil } from 'utils/SendEmail';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private mailerUtil: MailerUtil,
  ) { }

  /*
  |--------------------------------------------------------------------------
  | LOGIN WITH MOBILE (AUTO REGISTER)
  |--------------------------------------------------------------------------
  */
  async login(LoginDto: LoginDto) {

    const { phone, role } = LoginDto;

    if (!phone) {
      throw new BadRequestException('Phone number required');
    }

    if (!/^\d{10}$/.test(phone)) {
      throw new BadRequestException('Phone must be 10 digits');
    }

    let user = await this.userRepo.findOne({ where: { phone } });

    /*
    |--------------------------------------------------------------------------
    | AUTO REGISTER
    |--------------------------------------------------------------------------
    */

    if (!user) {

      const createUser: CreateUserDto = {
        ...LoginDto,
        verified: false,
        image: '',
      };

      user = await this.register(createUser);

    }

    /*
    |--------------------------------------------------------------------------
    | ROLE CHECK
    |--------------------------------------------------------------------------
    */

    if (role && role !== user.role) {
      throw new BadRequestException(`You are not allowed to login as ${role}`);
    }

    /*
    |--------------------------------------------------------------------------
    | GENERATE OTP
    |--------------------------------------------------------------------------
    */

    const otp = otp_generator() as number;

    const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

    user.otp = otp;
    user.otpExpireTime = otpExpireTime;

    await this.userRepo.save(user);

    console.log("OTP:", otp);

    return {
      success: true,
      message: 'OTP sent successfully',
    };

  }
  /*
  |--------------------------------------------------------------------------
  | VERIFY OTP
  |--------------------------------------------------------------------------
  */
  async verifyOtp(VerifyOtpDto: VerifyOtpDto) {
    const { phone, otp } = VerifyOtpDto;

    const user = await this.userRepo.findOne({ where: { phone } });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const enteredOtp = Number(otp);

    const isDefaultOtp = enteredOtp === 123456;
    const isValidOtp = user.otp === enteredOtp;

    //  Invalid OTP
    if (!(isDefaultOtp || isValidOtp)) {
      return {
        success: false,
        message: 'Invalid OTP Please try again',
      };
    }

    // Expired OTP (default OTP ko expire check se skip kar sakte ho)
    const now = new Date();
    if (!isDefaultOtp && (!user.otpExpireTime || user.otpExpireTime < now)) {
      return {
        success: false,
        message: 'OTP expired',
      };
    }

    user.otp = null;
    user.otpExpireTime = null;
    user.HowManyOtpSend = 0;
    user.verified = true;

    await this.userRepo.save(user);

    const payload = {
      id: user.id,
      username: user.username,
      phone: user.phone,
      email: user.email,
      image: user.image,
      role: user.role,
      verified: user.verified,
      doctor_id: user?.doctorId || null,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'OTP verified successfully',
      token,
      role: user.role,
      user: payload,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | RESEND OTP
  |--------------------------------------------------------------------------
  */
  async resendOtp(resendOtpDto: resendOtpDto) {

    const { phone } = resendOtpDto;

    const user = await this.userRepo.findOne({ where: { phone } });

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    if (user.HowManyOtpSend >= 3) {
      return {
        success: false,
        message: 'OTP limit reached'
      };
    }

    const otp = otp_generator() as number;

    const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

    user.otp = otp;
    user.otpExpireTime = otpExpireTime;
    user.HowManyOtpSend += 1;

    await this.userRepo.save(user);

    console.log("Resend OTP:", otp);

    return {
      success: true,
      message: 'OTP resent successfully'
    };

  }

  /*
  |--------------------------------------------------------------------------
  | LOGIN WITH EMAIL
  |--------------------------------------------------------------------------
  */

  async loginWithEmail(body: {
    email: string;
    password: string;
    role: string;
  }): Promise<{
    success: boolean;
    message: string;
    token?: string;
    role: string;
    user: object;
  }> {
    try {
      const { email, password } = body;

      if (!email || !password) {
        return {
          success: false,
          message: 'Email/phone and password required.',
          role: '',
          user: {},
        };
      }

      // const user = await this.userRepo.findOne({ where: { email } });
      let user;

      if (/^\d{10}$/.test(email)) {

        user = await this.userRepo.findOne({
          where: { phone: email }
        });

      } else {

        user = await this.userRepo.findOne({
          where: { email: email }
        });

      }

      if (!user) {
        return {
          success: false,
          message: 'Account not found.',
          role: '',
          user: {},
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid password.',
          role: '',
          user: {},
        };
      }

      const payload = {
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        image: user.image,
        role: user.role,
        verified: user.verified,
        doctor_id: user?.doctorId || null,
      };

      const token = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'Login successful.',
        token,
        role: user.role,
        user: payload,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: 'Login failed.',
        role: '',
        user: {},
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REGISTER USER
  |--------------------------------------------------------------------------
  */
  async register(createUserDto: CreateUserDto): Promise<User> {

    const { phone, role } = createUserDto;

    if (!phone || !role) {
      throw new BadRequestException('Phone and role required');
    }

    const existingUser = await this.userRepo.findOne({ where: { phone } });

    if (existingUser) {
      throw new ConflictException('Phone already exists');
    }

    const otp = otp_generator() as number;

    const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000);

    const avatar = `https://ui-avatars.com/api/?name=Guest`;

    createUserDto.username = "Guest";
    createUserDto.otp = otp;
    createUserDto.otpExpireTime = otpExpireTime;
    createUserDto.image = avatar;
    createUserDto.isActive = true;

    /* password dummy */

    createUserDto.password = await bcrypt.hash(String(phone), 10);

    const user = this.userRepo.create(createUserDto);

    const savedUser = await this.userRepo.save(user);

    console.log("Register OTP:", otp);

    return savedUser;

  }


  async googleLogin(profile: any) {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const image = profile.photos[0].value;

    let user = await this.userRepo.findOne({
      where: { email }
    });


    if (!user) {
      const newUser = this.userRepo.create({
        email,
        username: name,
        image,
        verified: true,
        role: 'user',
        isActive: true
      });

      user = await this.userRepo.save(newUser);
    }

    const payload = {
      id: user.id,
      username: user.username,
      phone: user.phone,
      email: user.email,
      image: user.image,
      role: user.role,
      verified: user.verified,
      doctor_id: user?.doctorId || null,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      role: user.role,
      user: payload
    };
  }
}