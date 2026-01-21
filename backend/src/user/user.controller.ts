/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { multerOptions } from 'src/config/multer.config';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAllUser() {
        return await this.userService.findAll();
    }

    @Post('/change-password/:id')
    async changePassword(@Body() userPassDto: { oldPassword: string; password: string; }, @Param('id') id: number) {
        if (!userPassDto.oldPassword || !userPassDto.password) throw new Error('Missing password');
        return await this.userService.changePassword(userPassDto, id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: { user: { id: number; } },) {
        return await this.userService.getProfile(req.user.id);
    }

    @Post('update-profile')
    @UseInterceptors(FileInterceptor('image', multerOptions))
    @UseGuards(JwtAuthGuard)
    updateProfile(
        @Body() body: { username: string; email: string; phone: string; dob: string; gender: string },
        @Request() req: { user: { id: number; } },  
        @UploadedFile() file?: Multer.File  
    ) {
        return this.userService.updateProfile(req.user.id, body, file);
    }


}

