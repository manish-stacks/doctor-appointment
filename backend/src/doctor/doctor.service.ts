/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DeepPartial, Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';
import { uploadToCloudinary } from 'src/helper/cloudinary.helper';
import { User } from 'src/user/user.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { DoctorSubscription } from 'src/doctor_subscription/doctor_subscription.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { TimeSlotEntity } from 'src/time-slot/time-slot.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { maskEmail, maskPhone } from 'src/helper/helper';


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
        @InjectRepository(TimeSlotEntity)
        private timeSlotRepository: Repository<TimeSlotEntity>,
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,
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
            doctorId: 'DOC' + Date.now().toString(),
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

        user.doctorId = doctor.id;
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
            paymentType: 'Welcome Plan',
            amount: 0,
            paymentId: null,
            paymentStatus: true,
            appointmentLimit: subscription.totalAppointment.toString(),
            isActive: true,
        });

        await this.doctorSubscriptionRepository.save(doctorSubscription);
    }

    // async findOneByUserId(userId: number) { 
    //     return this.doctorRepository.findOne({ where: { userId }, relations: ['user', 'hospital'], }); 
    // }

    async findOneByUserId(userId: number) {
        const doctor = await this.doctorRepository.findOne({
            where: { userId },

            select: {
                id: true,
                name: true,
                expertise: true,
                experience: true,
                appointmentFees: true,
                image: true,
                desc: true,
                education: true,
                certificate: true,
                timeSlot: true,
                dob: true,
                gender: true,
                isActive: true,
                isPopular: true,
                patientVideoCall: true,
                user: {
                    id: true,
                    username: true,
                    email: true,
                    phone: true,
                    image: true,
                    role: true,
                },

                hospital: {
                    id: true,
                    name: true,
                    phone: true,
                    address: true,
                },
            },

            relations: {
                user: true,
                hospital: true,
            },
        });

        if (!doctor) return null;

        return {
            ...doctor,
            user: {
                ...doctor.user,
                email: maskEmail(doctor.user.email),
                phone: maskPhone(doctor.user.phone),
            },
        };
    }


    async findAll(query: {
        search?: string;
        category?: string;
        location?: string;
        page?: number;
        limit?: number;
    }) {
        
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 8;
        const skip = (page - 1) * limit;

        const qb = this.doctorRepository
            .createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.user', 'user')
            .leftJoinAndSelect('doctor.hospital', 'hospital')
            .leftJoinAndSelect('doctor.category', 'category')
            .where('doctor.isActive = :isActive', { isActive: true });

        if (query.search) {
            qb.andWhere(
                '(LOWER(doctor.name) LIKE LOWER(:search) OR LOWER(category.name) LIKE LOWER(:search))',
                { search: `%${query.search}%` },
            );
        }

        if (query.category) {
            qb.andWhere('category.name = :category', {
                category: query.category,
            });
        }

        if (query.location) {
            qb.andWhere('user.state = :location', {
                location: query.location,
            });
        }

        const [doctors, total] = await qb
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            data: doctors.map(d => ({
                id: d.id,
                name: d.name,
                image: d.image,
                experience: d.experience,
                appointmentFees: d.appointmentFees,
                category: d.category?.name,
                degree: d.certificate,
                location: d.user?.address,
                phone: maskPhone(d.hospital?.phone),
                available: d.isActive,
            })),
            meta: {
                total,
                page,
                limit,
                hasMore: skip + limit < total,
            },
        };
    }


    async getLocations() {
        const states = await this.doctorRepository
            .createQueryBuilder('doctor')
            .leftJoin('doctor.user', 'user')
            .select('DISTINCT user.state', 'state')
            .where('user.state IS NOT NULL')
            .getRawMany();

        return states.map(s => s.state);
    }


    // async findAll() {
    //     const doctors = await this.doctorRepository.find({
    //         select: {
    //             id: true,
    //             name: true,
    //             expertise: true,
    //             experience: true,
    //             appointmentFees: true,
    //             image: true,
    //             certificate: true,
    //             isActive: true,
    //             isPopular: true,
    //             patientVideoCall: true,
    //             user: {
    //                 username: true,
    //                 email: true,
    //                 phone: true,
    //             },
    //             hospital: {
    //                 name: true,
    //                 phone: true,
    //                 address: true,
    //             },
    //             category: {
    //                 name: true,
    //             },
    //         },
    //         relations: {
    //             user: true,
    //             hospital: true,
    //             category: true,
    //         },
    //     });

    //     return doctors.map((doctor) => {
    //         const certificates = JSON.parse(doctor.certificate || '[]');

    //         return {
    //             ...doctor,
    //             certificate: certificates.map((c) => c.name), 
    //         };
    //     });
    // }


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

    async findScheduleByUserId(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException('Doctor not found');
        return this.timeSlotRepository.find({ where: { doctorId: doctor.id } });
    }
    async findBookedSlots(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException('Doctor not found');
        // return this.appointmentRepository.find({ where: { doctorId: doctor.id, appointmentStatus: 'Booked' } });
        return this.appointmentRepository.find({
            where: { doctorId: doctor.id, appointmentStatus: 'Booked' },
            select: {
                id: true,
                date: true,
                time: true,
                userId: true,
                patientId: true,
                appointmentStatus: true,
                doctorId: true
            }
        })
    }

    async searchDoctor(q: string) {
        if (!q) return this.doctorRepository.find({ take: 10 });

        return this.doctorRepository
            .createQueryBuilder('d')
            .where('d.name LIKE :q', { q: `%${q}%` })
            .orWhere('CAST(d.doctorId AS CHAR) LIKE :q', { q: `%${q}%` })
            .take(10)
            .getMany();
    }

}