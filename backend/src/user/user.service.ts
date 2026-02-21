/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll() {
    return await this.userRepository.find();
  }

  async changePassword(userPassDto: { newPassword: string; }, userId: number) {

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    // const isMatch: boolean = await bcrypt.compare(oldPassword, user.password);

    user.password = await bcrypt.hash(userPassDto.newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Password updated successfully' };

  }
  async getProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  }
  async updateProfile(
    userId: number,
    data: {
      username: string;
      email: string;
      phone: string;
      dob?: string;
      gender?: string;
      state?: string;
      city?: string;
      address?: string;
      age?: number;
    },
    file?: any,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.username = data.username;
    user.email = data.email;
    user.phone = data.phone;
    user.dob = data.dob;
    user.gender = data.gender;
    user.state = data.state;
    user.city = data.city;
    user.address = data.address || '';
    user.age = data.age || 0;

    if (file) {
      const result: { secure_url: string } =
        await uploadToCloudinary(file.path, 'user_profiles');
      user.image = result.secure_url;
    }

    return this.userRepository.save(user);
  }


  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.isActive = false;

    await this.userRepository.save(user);

    return { message: 'Account deactivated successfully' };
  }

  async updateSettings(userId: number, data: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.emailNotifications = data.emailNotifications;
    user.smsNotifications = data.smsNotifications;
    user.appointmentReminders = data.appointmentReminders;
    user.showProfileToDoctors = data.showProfileToDoctors;
    user.allowAnalytics = data.allowAnalytics;

    return this.userRepository.save(user);
  }

  async getUsers(query: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    console.log("role", query.role);
    if (query.role === "CUSTOMER") {
      query.role = "user";
    }
    if (query.role === "STAFF") {
      query.role = "STAFF";
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.doctor', 'doctor')
      .where('1=1');

    if (query.search) {
      qb.andWhere(
        '(LOWER(user.username) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.role && query.role !== 'ALL') {
      qb.andWhere('user.role = :role', { role: query.role });
    }

    const [users, total] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: users.map((u) => ({
        id: u.id,
        name: u.username,
        email: u.email,
        phone: u.phone,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
      })),
      lastPage: Math.ceil(total / limit),
    };
  }
}
