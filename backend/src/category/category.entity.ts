/* eslint-disable prettier/prettier */
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

  @Column()
  image: string;

  @Column({ type: 'tinyint', default: 1 })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Treatments, (treatment) => treatment.category)
  treatments: Treatments[];

  @UpdateDateColumn()
  updatedAt: Date;
}
