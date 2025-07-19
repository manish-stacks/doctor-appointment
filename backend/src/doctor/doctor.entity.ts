/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hospital } from 'src/hospital/hospital.entity';
import { Category } from 'src/category/category.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { User } from 'src/user/user.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  userId: number;

  @Column({ nullable: true })
  expertise: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  hospitalId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  treatmentId: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  subscriptionId: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: true })
  certificate: string;

  @Column({ type: 'varchar', nullable: true })
  appointmentFees: string;

  @Column({ type: 'varchar', nullable: true })
  experience: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  timeSlot: string;

  @Column({ type: 'varchar', length: 100 })
  dob: string;

  @Column({ type: 'varchar', length: 50 })
  gender: string;


  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  subscriptionStatus: boolean;

  @Column({ default: false })
  isPopular: boolean;

  @Column({ default: false })
  patientVideoCall: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Hospital, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'hospitalId' })
  hospital: Hospital;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Subscription, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

}
