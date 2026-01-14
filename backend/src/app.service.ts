/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: true,
      message: '🚀 Welcome to Doctor Appointment API',
      version: '1.0.0',
      time: new Date(),
      author: 'Manish Sharma',
    };
  }
}
