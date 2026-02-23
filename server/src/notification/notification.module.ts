/*  eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    AuthModule
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule { }
