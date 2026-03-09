/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctor/doctor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 0 })
  HowManyOtpSend: number;

  @Column({ unique: true, nullable: true })
  phone: string;

  /* OTP */

  @Column({ type: 'int', nullable: true })
  otp: number | null;

  @Column({ type: 'timestamp', nullable: true })
  otpExpireTime: Date | null;

  /* Profile */

  @Column({ length: 255, nullable: true })
  dob?: string;

  @Column({ length: 255, nullable: true })
  gender?: string;

  @Column({ length: 255, nullable: true })
  state?: string;

  @Column({ length: 255, nullable: true })
  city?: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ nullable: true })
  age: number;

  /* Doctor relation */

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  doctorId: number;

  @Column({ length: 255, nullable: true })
  image?: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'tinyint', default: 0 })
  verified: boolean;

  /* Settings */

  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: true })
  smsNotifications: boolean;

  @Column({ default: true })
  appointmentReminders: boolean;

  @Column({ default: true })
  showProfileToDoctors: boolean;

  @Column({ default: false })
  allowAnalytics: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Doctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

}