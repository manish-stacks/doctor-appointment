/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DeepPartial, Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Hospital)
        private hospitalRepository: Repository<Hospital>,
    ) { }

    async create(
        doctorDto: DoctorDto,
        userId: number,
        filePath?: string
    ): Promise<Doctor> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const hospital = await this.hospitalRepository.findOne({
            where: { id: Number(doctorDto.hospitalId) },
        });

        if(!hospital) throw new NotFoundException('Hospital not found');

        if (filePath) {
            const result: { secure_url: string } = await uploadToCloudinary(filePath);
            doctorDto.image = result.secure_url;
        }

        
        user.email = doctorDto.user.email;
        user.phone = doctorDto.user.phone;
        user.username = doctorDto.name;
        user.dob = doctorDto.dob;
        user.gender = doctorDto.gender;
        user.image = doctorDto.image ?? '';

        const doctorData: DeepPartial<Doctor> = {
            name: doctorDto.name,
            categoryId: Number(doctorDto.categoryId),
            treatmentId: Number(doctorDto.treatmentId),
            expertise: doctorDto.expertise,
            hospitalId: hospital?.id,
            userId: userId,
            image: doctorDto.image,
            desc: doctorDto.desc,
            education: JSON.stringify(doctorDto.certificate),
            certificate: JSON.stringify(doctorDto.certificate),
            appointmentFees: doctorDto.appointmentFees,
            experience: doctorDto.experience,
            timeSlot: doctorDto.timeSlot.toString(),
            dob: doctorDto.dob,
            gender: doctorDto.gender,
            isActive: false,
            subscriptionStatus: true,
            isPopular: true,
            patientVideoCall: false,
        };

        const existingDoctor = await this.doctorRepository.findOne({
            where: { userId },
        });

        if (existingDoctor) {
            Object.assign(existingDoctor, doctorData);
            const updatedDoctor = await this.doctorRepository.save(existingDoctor);
            user.doctor_id = updatedDoctor.id;
            await this.userRepository.save(user);
            return updatedDoctor;
        } else {

            const newDoctor = this.doctorRepository.create({ ...doctorData, userId });
            const savedDoctor = await this.doctorRepository.save(newDoctor);
            user.doctor_id = savedDoctor.id;
            await this.userRepository.save(user);
            return savedDoctor;
        }


    }

    async findOneByUserId(userId: number) {
        return this.doctorRepository.findOne({
            where: { userId },
            relations: ['user', 'hospital'],
        });
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