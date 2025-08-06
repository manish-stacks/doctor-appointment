/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private subscriptionRepository: Repository<Subscription>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(DoctorSubscription)
        private doctorSubscriptionRepository: Repository<DoctorSubscription>
    ) { }

    async findAll() {
        return this.subscriptionRepository.find();
    }

    async findUserBuy(userId: number) {
        const doctor = await this.doctorRepository.findOne({ where: { userId } });
        if (!doctor) {
            throw new NotFoundException('Doctor not found');
        }

        const subscription = await this.doctorSubscriptionRepository
            .createQueryBuilder('ds')
            .select(['ds.subscriptionId'])
            .where('ds.doctorId = :doctorId', { doctorId: doctor.id })
            .andWhere('ds.status = :status', { status: 'active' })
            .orderBy('ds.startDate', 'DESC')
            .getOne();

        return subscription ? subscription : null;
    }


    async create(name: string, plan: string, totalAppointment: number) {
        const subscription = new Subscription();
        subscription.name = name;
        //subscription.plan = plan;
        subscription.totalAppointment = totalAppointment;
        return this.subscriptionRepository.save(subscription);
    }

    async findOne(id: number) {
        return this.subscriptionRepository.findOne({ where: { id } });
    }

    async update(id: number, name: string, plan: string, totalAppointment: number) {
        const subscription = await this.subscriptionRepository.findOne({ where: { id } });
        if (!subscription) return 'Subscription not found';
        subscription.name = name;
        //subscription.plan = plan;
        subscription.totalAppointment = totalAppointment;
        return this.subscriptionRepository.save(subscription);
    }

    async remove(id: number) {
        const subscription = await this.subscriptionRepository.findOne({ where: { id } });
        if (!subscription) return 'Subscription not found';
        return this.subscriptionRepository.remove(subscription);
    }
}
