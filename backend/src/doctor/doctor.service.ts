/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DeepPartial, Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { Subscription } from 'src/subscription/subscription.entity';


@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Hospital)
        private hospitalRepository: Repository<Hospital>,
        @InjectRepository(DoctorSubscription)
        private doctorSubscriptionRepository: Repository<DoctorSubscription>,
        @InjectRepository(Subscription)
        private subscriptionsRepository: Repository<Subscription>,
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
        if (!hospital) throw new NotFoundException('Hospital not found');


        if (filePath) {
            const result: { secure_url: string } = await uploadToCloudinary(filePath);
            doctorDto.profileImage = result.secure_url;
        }


        user.email = doctorDto.user.email;
        user.phone = doctorDto.user.phone;
        user.username = doctorDto.name;
        user.dob = doctorDto.dob;
        user.gender = doctorDto.gender;
        user.image = doctorDto.profileImage ?? '';

        const doctorData: DeepPartial<Doctor> = {
            name: doctorDto.name,
            categoryId: Number(doctorDto.categoryId),
            treatmentId: Number(doctorDto.treatmentId),
            expertise: doctorDto.expertise,
            hospitalId: hospital?.id,
            userId: userId,
            image: doctorDto.profileImage,
            desc: doctorDto.desc,
            education: JSON.stringify(doctorDto.education),
            certificate: JSON.stringify(doctorDto.certificate),
            appointmentFees: doctorDto.appointmentFees,
            experience: doctorDto.experience,
            timeSlot: doctorDto.timeSlot.toString(),
            dob: doctorDto.dob,
            gender: doctorDto.gender,
            isActive: false,
            isPopular: true,
            patientVideoCall: false,
            // subscriptionStatus: true,
            // subscriptionId: 1
        };

        const existingDoctor = await this.doctorRepository.findOne({ where: { userId } });

        let doctor: Doctor;

        if (existingDoctor) {
            Object.assign(existingDoctor, doctorData);
            doctor = await this.doctorRepository.save(existingDoctor);
        } else {
            const newDoctor = this.doctorRepository.create(doctorData);
            doctor = await this.doctorRepository.save(newDoctor);

            await this.createDoctorSubscription(doctor.id, 1); // 1 = Free Trial
        }

        user.doctor_id = doctor.id;
        await this.userRepository.save(user);

        return doctor;
    }
    async createDoctorSubscription(doctorId: number, subscriptionId: number) {
        const subscription = await this.subscriptionsRepository.findOne({ where: { id: subscriptionId } });

        if (!subscription) throw new NotFoundException('Subscription not found');

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + subscription.validity); // assuming validity is in months

        const doctorSubscription = this.doctorSubscriptionRepository.create({
            doctorId: doctorId,
            subscriptionId: subscriptionId,
            duration: subscription.validity,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            paymentType: 'free',
            amount: 0,
            paymentId: null,
            paymentStatus: true,
            appointmentLimit: subscription.totalAppointment.toString(),
            isActive: true,
        });

        await this.doctorSubscriptionRepository.save(doctorSubscription);
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