/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: '' })
  author: string;

  @Column({ default: false })
  isPublished: boolean;
  
  @Column({ length: 255, nullable: true })
  image: string;
  // @ManyToOne(() => User, (user) => user.id)
  // author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
