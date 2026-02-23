/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    getNotifications(@Request() req: { user: { id: number; } }) {
        return this.notificationService.getUserNotifications(req.user.id);
    }

    @Post(':id/read')
    @UseGuards(JwtAuthGuard)
    markAsRead(@Param('id') id: number, @Request() req: { user: { id: number; } }) {
        return this.notificationService.markAsRead(id, req.user.id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteNotification(@Param('id') id: number, @Request() req: { user: { id: number; } }) {
        return this.notificationService.deleteNotification(id, req.user.id);
    }

}
