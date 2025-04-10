import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineService {
    constructor(@InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>) { }

    async findAll() {
        return this.medicineRepository.find();
    }

    async findOne(id: number) {
        return this.medicineRepository.findOne({ where: { id } });
    }

    async create(name: string) {
        const medicine = new Medicine();
        medicine.name = name;
        return this.medicineRepository.save(medicine);
    }

    async update(id: number, name: string) {
        const medicine = await this.medicineRepository.findOne({ where: { id } });
        if (!medicine) return 'Medicine not found';
        medicine.name = name;   
        return this.medicineRepository.save(medicine);
    }

    async remove(id: number) {
        const medicine = await this.medicineRepository.findOne({ where: { id } });
        if (!medicine) return 'Medicine not found';
        return this.medicineRepository.remove(medicine);
    }
}
