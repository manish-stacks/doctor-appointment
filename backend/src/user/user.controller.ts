/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async findAllUser(){
        return await this.userService.findAll();
    }

    @Post('/change-password/:id')
    async changePassword(@Body() userPassDto: { oldPassword: string; password: string; }, @Param('id') id: number) {
        if(!userPassDto.oldPassword || !userPassDto.password) throw new Error('Missing password');
        return await this.userService.changePassword(userPassDto, id);
    }



}

