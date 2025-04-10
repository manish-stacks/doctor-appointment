import { Injectable } from '@nestjs/common';
import { DoctorSubscription } from './doctor_subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorSubscriptionService {
    constructor(@InjectRepository(DoctorSubscription)
    private doctorSubscriptionRepository: Repository<DoctorSubscription>) { }



    async findAll() {
        return this.doctorSubscriptionRepository.find();
    }

    async create(userId: number, doctorId: number) {
        const doctorSubscription = this.doctorSubscriptionRepository.create({
            doctorId:userId
        });
        return this.doctorSubscriptionRepository.save(doctorSubscription);
    }
    async findOne(id: number) {
        return this.doctorSubscriptionRepository.findOne({ where: { id } });
    }
    async update(id: number, userId: number, doctorId: number) {
        const doctorSubscription = await this.findOne(id);
        if (!doctorSubscription) return 'Doctor Subscription not found';
        doctorSubscription.doctorId = userId;
        // doctorSubscription.doctorId = doctorId;
        return this.doctorSubscriptionRepository.save(doctorSubscription);
    }
    async delete(id: number) {
        const doctorSubscription = await this.findOne(id);
        if (!doctorSubscription) return 'Doctor Subscription not found';
        return this.doctorSubscriptionRepository.remove(doctorSubscription);
    }
}
