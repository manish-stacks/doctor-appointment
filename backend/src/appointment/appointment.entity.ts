import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    appointmentId: string;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true })
    doctorId: number;

    @Column({ type: 'varchar', length: 10 })
    amount: number;

    @Column({ type: 'varchar', length: 255 })
    paymentType: string;

    @Column({ type: 'varchar', length: 255 })
    appointmentFor: string;

    @Column({ type: 'varchar', length: 255 })
    patientName: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'text', nullable: true })
    reportImage: string;

    @Column({ type: 'text' })
    drugEffect: string;

    @Column({ type: 'text' })
    patientAddress: string;

    @Column({ type: 'text' })
    phoneNo: string;

    @Column({ type: 'varchar', length: 255 })
    date: string;

    @Column({ type: 'varchar', length: 255 })
    time: string;

    @Column({ type: 'tinyint' })
    paymentStatus: number;

    @Column({ type: 'text', nullable: true })
    paymentToken: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    appointmentStatus: string;

    @Column({ type: 'text' })
    note: string;

    @Column({ type: 'text', nullable: true })
    cancelReason: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    cancelBy: string;

    @Column({ type: 'int', nullable: true })
    discountId: number;

    @Column({ type: 'int', nullable: true })
    discountPrice: number;

    @Index()
    @Column({ type: 'bigint', unsigned: true, nullable: true })
    hospitalId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    zoomUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
