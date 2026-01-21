/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async getFavoriteDoctors(userId: number) {
    return this.favoriteRepository.find({
      where: { userId },
      relations: ['doctor','doctor.hospital'],
    });
  }

  async removeFavoriteDoctor(userId: number, doctorId: number) {
    const favorite = await this.favoriteRepository.findOne({
      where: { userId, doctorId },
    });
    if (favorite) {
      await this.favoriteRepository.remove(favorite);
      return { message: 'Doctor removed from favorites' };
    } else {
      return { message: 'Favorite not found' };
    }
  }
}
