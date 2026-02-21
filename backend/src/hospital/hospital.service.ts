/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';
import { HospitalDto } from './hospital.dto';

@Injectable()
export class HospitalService {
    constructor(@InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>) { }




    async getPublicHospitals() {
        return await this.hospitalRepository.find({
            where: {
                isVerified: true,
                isActive: true,
            },
        });
    }

    async getHospitalsWithUserExtras(userId: number) {
        const publicHospitals = await this.hospitalRepository.find({
            where: {
                isVerified: true,
                isActive: true,
            },
        });

        const userHospitals = await this.hospitalRepository.find({
            where: {
                userId: userId,
            },
        });

        const combined = [
            ...publicHospitals,
            ...userHospitals.filter(
                (h) => !publicHospitals.some((p) => p.id === h.id)
            ),
        ];

        return combined;
    }
    getHospital(id: number) {
        return this.hospitalRepository.findOne({ where: { id } });
    }

    getHospitalsByUser(userId: number) {
        return this.hospitalRepository.find({ where: { userId } });
    }
    createHospital(hospitalDto: HospitalDto) {
        return this.hospitalRepository.save(hospitalDto);
    }

    updateHospital(id: number, name: string) {
        return this.hospitalRepository.update(id, { name });
    }

    deleteHospital(id: number) {
        return this.hospitalRepository.delete(id);
    }

    async getHospitals(query: { page?: number; limit?: number; type?: string }) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const qb = this.hospitalRepository.createQueryBuilder('hospital');

        if (query.type === 'PENDING') {
            qb.andWhere('hospital.isVerified = false');
        }

        if (query.type === 'ACTIVE') {
            qb.andWhere('hospital.isActive = true');
        }

        if (query.type === 'INACTIVE') {
            qb.andWhere('hospital.isActive = false');
        }

        const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();

        return {
            data,
            lastPage: Math.ceil(total / limit),
        };
    }

    async approveHospital(id: number) {
        await this.hospitalRepository.update(id, { isVerified: true });
        return { message: 'Hospital Approved' };
    }


    async toggleStatus(id: number) {
        const hospital = await this.hospitalRepository.findOne({ where: { id } });
        if (!hospital) return;

        hospital.isActive = !hospital.isActive;
        await this.hospitalRepository.save(hospital);

        return { message: 'Status Updated' };
    }

    

}
