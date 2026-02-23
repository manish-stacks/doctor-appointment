/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
    @Post()
    getUsers(
        @Body()
        body: {
            page?: number;
            limit?: number;
            search?: string;
            role?: string;
        },
    ) {
        return this.userService.getUsers(body);
    }


    @UseGuards(JwtAuthGuard)
    @Delete('delete-account')
    deleteAccount(@Request() req: { user: { id: number; } }) {
        return this.userService.deleteUser(req.user.id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: { user: { id: number; } },) {
        return await this.userService.getProfile(req.user.id);
    }

    // @Post('update-profile')
    // @UseInterceptors(FileInterceptor('image', multerOptions))
    // @UseGuards(JwtAuthGuard)
    // updateProfile(
    //     @Body() body: { username: string; email: string; phone: string; dob: string; gender: string },
    //     @Request() req: { user: { id: number; } },
    //     @UploadedFile() file?: Multer.File
    // ) {
    //     return this.userService.updateProfile(req.user.id, body, file);
    // }

    @Post('update-profile')
    @UseInterceptors(FileInterceptor('image', multerOptions))
    @UseGuards(JwtAuthGuard)
    updateProfile(
        @Body()
        body: {
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
        @Request() req: { user: { id: number } },
        @UploadedFile() file?: Multer.File,
    ) {
        return this.userService.updateProfile(req.user.id, body, file);
    }


    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changeOwnPassword(
        @Body() userPassDto: { newPassword: string; },
        @Request() req: { user: { id: number; } },
    ) {
        if (!userPassDto.newPassword) throw new Error('Missing password');
        return await this.userService.changePassword(userPassDto, req.user.id);
    }

    @Post('update-settings')
    @UseGuards(JwtAuthGuard)
    updateSettings(
        @Body()
        body: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            appointmentReminders: boolean;
            showProfileToDoctors: boolean;
            allowAnalytics: boolean;
        },
        @Request() req: { user: { id: number } },
    ) {
        return this.userService.updateSettings(req.user.id, body);
    }

}

