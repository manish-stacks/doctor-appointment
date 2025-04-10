/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { CategoryModule } from './category/category.module';
import { DoctorSubscriptionModule } from './doctor_subscription/doctor_subscription.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MedicineModule } from './medicine/medicine.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { HospitalModule } from './hospital/hospital.module';
import { MedicineCategoryModule } from './medicine_category/medicine_category.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ReportModule } from './report/report.module';
import { UserAddressModule } from './user_address/user_address.module';
import { VideocallHistoryModule } from './videocall_history/videocall_history.module';
import { WorkingHourModule } from './working_hour/working_hour.module';
import { ZoomMeetingModule } from './zoom_meeting/zoom_meeting.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    AuthModule,
    BlogModule,
    DoctorModule,
    AppointmentModule,
    CategoryModule,
    DoctorSubscriptionModule,
    SubscriptionModule,
    MedicineModule,

    TreatmentsModule,
    HospitalModule,
    MedicineCategoryModule,
    PrescriptionModule,
    ReportModule,
    UserAddressModule,
    VideocallHistoryModule,
    WorkingHourModule,
    ZoomMeetingModule,
    FavoriteModule,
    ReviewModule,
  ],
})
export class AppModule {}
