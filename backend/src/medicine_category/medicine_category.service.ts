import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineCategory } from './medicine_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineCategoryService {

    constructor(
        @InjectRepository(MedicineCategory)
        private medicineCategoryRepository: Repository<MedicineCategory>) { }

    findAll() {
        return this.medicineCategoryRepository.find();
    }

    findOne(id: number) {
        return this.medicineCategoryRepository.findOne({ where: { id } });
    }

    create(name: string) {
        return this.medicineCategoryRepository.save({ name });
    }

    update(id: number, name: string) {
        return this.medicineCategoryRepository.update(id, { name });
    }

    delete(id: number) {
        return this.medicineCategoryRepository.delete(id);
    }
}
