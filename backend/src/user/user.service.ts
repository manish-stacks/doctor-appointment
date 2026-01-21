/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll() {
    return await this.userRepository.find();
  }

  async changePassword(userPassDto: { oldPassword: string; password: string; }, id: number) {

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    if (user.password !== userPassDto.oldPassword) throw new Error('Invalid password');
    return await this.userRepository.update(id, { ...userPassDto })
  }
  async getProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  }
  async updateProfile(userId: number, data: { username: string; email: string; phone: string; dob: string; gender: string, image?: string }, file) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.username = data.username;
    user.email = data.email;
    user.phone = data.phone;
    user.dob = data.dob;
    user.gender = data.gender;

    if (file) {
      const result: { secure_url: string } = await uploadToCloudinary(file);
      user.image = result.secure_url;
    }

    return this.userRepository.save(user);
  }

}
