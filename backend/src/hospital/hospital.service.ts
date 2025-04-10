import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';

@Injectable()
export class HospitalService {
    constructor(@InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>) { }



    getHospitals() {
        return this.hospitalRepository.find();
    }

    getHospital(id: number) {
        return this.hospitalRepository.findOne({ where: { id } });
    }

    createHospital(name: string) {
        return this.hospitalRepository.save({ name });
    }

    updateHospital(id: number, name: string) {
        return this.hospitalRepository.update(id, { name });
    }

    deleteHospital(id: number) {
        return this.hospitalRepository.delete(id);
    }
}
