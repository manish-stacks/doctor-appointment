/* eslint-disable prettier/prettier */

import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    userId: number; // login user

    @Column()
    patientId: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    gender: string;

    @Column()
    relation: string; // self, mother, father, son

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId' })
    user: User;

}
