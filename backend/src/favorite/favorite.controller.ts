/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Get('doctors')
  async getFavoriteDoctors(@Request() req: { user: { id: number; } }) {
    return this.favoriteService.getFavoriteDoctors(req.user.id);
  }

  @Delete('doctors/:doctorId')
  @UseGuards(JwtAuthGuard)
  async removeFavoriteDoctor(
    @Param('doctorId') doctorId: number,
    @Request() req: { user: { id: number; } },
  ) {
    return this.favoriteService.removeFavoriteDoctor(req.user.id, doctorId);
  }
}
