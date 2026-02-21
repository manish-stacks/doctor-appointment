/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('payments')
export class Payment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column()
  referenceId: string; // appointmentId or subscriptionId

  @Column()
  referenceType: 'APPOINTMENT' | 'SUBSCRIPTION';

  @Column({ nullable: true })
  doctorId: number;

  @Column({ nullable: true })
  userId: number;

  @Column('decimal')
  amount: number;

  @Column('decimal', { default: 0 })
  platformCommission: number;

  @Column('decimal', { default: 0 })
  doctorEarning: number;

  @Column()
  paymentMethod: string;

  @Column()
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';

  @Column({ default: false })
  payoutDone: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

/*
await this.paymentRepository.save({
  transactionId: subscription.paymentId,
  referenceId: subscription.id,
  referenceType: 'SUBSCRIPTION',
  doctorId: doctorId,
  userId: null,
  amount: subscription.amount,
  platformCommission: subscription.amount,
  doctorEarning: 0,
  paymentMethod: subscription.paymentType,
  paymentStatus: 'Paid',
});



const commissionPercent = 10;

const commission = appointment.finalAmount * (commissionPercent / 100);
const doctorEarning = appointment.finalAmount - commission;

await this.paymentRepository.save({
  transactionId: appointment.transactionId,
  referenceId: appointment.appointmentId,
  referenceType: 'APPOINTMENT',
  doctorId: appointment.doctorId,
  userId: appointment.userId,
  amount: appointment.finalAmount,
  platformCommission: commission,
  doctorEarning,
  paymentMethod: appointment.paymentType,
  paymentStatus: 'Paid',
});

*/