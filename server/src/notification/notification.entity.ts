/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;


  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column()
  type: string;
  // admin | doctor | reminder | booking | system

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  userId: number;


  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;


  @CreateDateColumn()
  createdAt: Date;


}
