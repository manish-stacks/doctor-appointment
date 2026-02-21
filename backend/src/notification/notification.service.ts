/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>) { }

    async createNotification(data: {
        userId: number;
        title: string;
        message: string;
        type: string;
    }) {
        const notification = this.notificationRepository.create(data);
        return this.notificationRepository.save(notification);
    }
    async getUserNotifications(userId: number) {
        return this.notificationRepository.find({
            where: { userId, isDeleted: false },
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(id: number, userId: number) {
        const notification = await this.notificationRepository.findOne({
            where: { id, userId },
        });

        if (!notification) throw new Error('Notification not found');

        notification.isRead = true;
        return this.notificationRepository.save(notification);
    }

    async deleteNotification(id: number, userId: number) {
        const notification = await this.notificationRepository.findOne({
            where: { id, userId },
        });

        if (!notification) throw new Error('Notification not found');

        notification.isDeleted = true;
        return this.notificationRepository.save(notification);
    }

}
