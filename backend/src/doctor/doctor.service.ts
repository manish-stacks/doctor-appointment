/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>
    ) { }

    async create(doctorDto: DoctorDto, userId: number, filePath?: string) {
        if (filePath) {
            const result = await uploadToCloudinary(filePath);
           // doctorDto.image = result.secure_url;
        }
        console.log(userId);
        console.log(doctorDto);
        const doctor = this.doctorRepository.create(doctorDto);
        return this.doctorRepository.save(doctor);
    }

    async findAll() {
        return this.doctorRepository.find();
    }

    async findOne(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException('Doctor not found');
        return doctor;
    }

    async update(id: number, doctorDto: DoctorDto) {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException('Doctor not found');

        Object.assign(doctor, doctorDto);
        return this.doctorRepository.save(doctor);
    }

    async remove(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException('Doctor not found');
        return this.doctorRepository.remove(doctor);
    }
}