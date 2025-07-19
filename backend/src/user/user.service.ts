/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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
    if(user.password !== userPassDto.oldPassword) throw new Error('Invalid password');
    return await this.userRepository.update(id, { ...userPassDto })
  }
}
