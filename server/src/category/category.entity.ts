/* eslint-disable prettier/prettier */
import { Doctor } from 'src/doctor/doctor.entity';
import { Treatments } from 'src/treatments/treatments.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  slug: string;

  @Column()
  image: string;

  @Column({ type: 'tinyint', default: 1 })
  isActive: boolean;

  @Column()
  icon: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;


  @OneToMany(() => Treatments, (treatment) => treatment.category)
  treatments: Treatments[];

  @OneToMany(() => Doctor, (doctor) => doctor.category)
  doctors: Doctor[];
}
