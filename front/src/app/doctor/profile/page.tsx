'use client'
import EducationCertificates, { Certificate, Education } from '@/components/doctor/profile/EducationCertificates'
import OtherInformation from '@/components/doctor/profile/OtherInformation'
import PersonalInformationForm from '@/components/doctor/profile/PersonalInformationForm'
import { AxiosInstance } from '@/helpers/Axios.instance'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


export interface PersonalInfo {
    image: File |  undefined;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    dateOfBirth: string;
    gender: string;
    professionalBio: string;
    hospitalName: string;
    hospitalNumber: string;
    hospitalFacility: string;
    hospitalLocation: string;
    // other information    
    experience: string,
    appointmentFees: string,
    categories: string,
    treatments: string,
    expertise: string,
    timeSlots: string,
};

const Profile = () => {

    const [formData, setFormData] = useState({
        image: undefined,
        name: "Dr. Michael Nguyen",
        email: "Confidential",
        phoneNumber: "1234567890",
        countryCode: "+91",
        dateOfBirth: "1978-11-05",
        gender: "male",
        professionalBio: "Dr. Michael Nguyen is a skilled orthopedic surgeon specializing in sports medicine.",
        hospitalName: "Toronto General Hospital",
        hospitalNumber: "1234",
        hospitalFacility: "Orthopedic Surgery",
        hospitalLocation: "123456/123456",

        experience: '12',
        appointmentFees: '1800',
        categories: 'Orthopedic Surgery',
        treatments: 'Orthopedics',
        expertise: 'Orthopedic Surgical Procedures',
        timeSlots: '30',
       
    })

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
            const response = await AxiosInstance.post(`/doctor/profile`, updatedForm)
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

    return (
        <>
            <PersonalInformationForm formData={formData} setFormData={setFormData} />
            <EducationCertificates educations={educations} setEducations={setEducations} certificates={certificates} setCertificates={setCertificates} />
            <OtherInformation formData={formData} setFormData={setFormData} handleUpdate={handleUpdate} />
        </>
    )
}

export default Profile