'use client'
import EducationCertificates, { Certificate, Education } from '@/components/doctor/profile/EducationCertificates'
import OtherInformation from '@/components/doctor/profile/OtherInformation'
import PersonalInformationForm from '@/components/doctor/profile/PersonalInformationForm'
import Loader from '@/components/Loader'
import { AxiosInstance } from '@/helpers/Axios.instance'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr';

const fetcher = (url: string) => AxiosInstance.get(url).then(res => res);

export interface PersonalInfo {
    image: File | undefined;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    dateOfBirth: string;
    gender: string;
    hospitalAddress: string;
    professionalBio: string;
    hospitalName: string;
    hospitalNumber: string;
    hospitalFacility: string;
    hospitalLocation: string;
    hospitalId: string;
    experience: string,
    appointmentFees: string,
    categories: string,
    treatments: string,
    expertise: string,
    timeSlots: string,
};

const Profile = () => {

    const [formData, setFormData] = useState<PersonalInfo>({
        image: undefined,
        name: "",
        email: "",
        phoneNumber: "",
        countryCode: "+91",
        dateOfBirth: "",
        gender: "",
        professionalBio: "",
        hospitalName: "",
        hospitalNumber: "",
        hospitalFacility: "",
        hospitalLocation: "",
        hospitalId: '',
        hospitalAddress: '',

        experience: '',
        appointmentFees: '',
        categories: '',
        treatments: '',
        expertise: '',
        timeSlots: '30',

    })

    const { data, isLoading } = useSWR('/doctor/profile/me', fetcher);
    console.log(data)
    useEffect(() => {
        if (data) {
            setFormData({
                image: data.image || "",
                name: data.name || "",
                email: data.email || "",                 
                phoneNumber: data.phoneNumber || "",      
                countryCode: data.countryCode || "+91",   
                dateOfBirth: data.dob || "",
                gender: data.gender || "",
                professionalBio: data.desc || "",
                hospitalName: data.hospital?.name || "",      
                hospitalNumber: data.hospital?.phone || "",
                hospitalFacility: data.hospital?.facility || "",
                hospitalLocation: data.hospital?.lat && data.hospital?.lng
                    ? `${data.hospital.lat}/${data.hospital.lng}` : "",
                hospitalId: data.hospitalId || "",
                hospitalAddress: data.hospital?.address || "",

                experience: data.experience || '',
                appointmentFees: data.appointmentFees || '',
                categories: data.categoryId || '',
                treatments: data.treatmentId || '',
                expertise: data.expertise || '',
                timeSlots: data.timeSlot || '30',
            });
        }
    }, [data]);


    const [educations, setEducations] = useState<Education[]>([
        { id: 1, degree: 'MD', institution: 'Medical University', year: '2003' }
    ]);

    const [certificates, setCertificates] = useState<Certificate[]>([
        { id: 1, name: 'Orthopedic Surgery Residency Program', year: '2008' }
    ]);


    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updatedForm = { ...formData, educations, certificates };

        try {
            const response = await AxiosInstance.post(`/doctor/profile`, updatedForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message.split(',')[0]);
                console.error('error', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
        console.log('Button clicked. Form data:', updatedForm);
    };


    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <PersonalInformationForm formData={formData} setFormData={setFormData} />
            <EducationCertificates educations={educations} setEducations={setEducations} certificates={certificates} setCertificates={setCertificates} />
            <OtherInformation formData={formData} setFormData={setFormData} handleUpdate={handleUpdate} />
        </>
    )
}

export default Profile