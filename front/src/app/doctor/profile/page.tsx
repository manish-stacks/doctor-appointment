'use client'
import EducationCertificates, { Certificate, Education } from '@/components/doctor/profile/EducationCertificates'
import OtherInformation from '@/components/doctor/profile/OtherInformation'
import PersonalInformationForm from '@/components/doctor/profile/PersonalInformationForm'
import Loader from '@/components/Loader'
import { AxiosInstance } from '@/helpers/Axios.instance'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr';

// const fetcher = (url: string) => AxiosInstance.get(url).then(res => res);

export interface PersonalInfo {
    // Basic Doctor fields
    image: File | string | undefined;
    name: string;
    categoryId: string;
    treatmentId: string;
    expertise: string;
    hospitalId: string;
    userId: string;
    desc: string; // professional bio
    education: string;
    certificate: string;
    appointmentFees: string;
    experience: string;
    timeSlot: string;
    dob: string; // date of birth
    gender: string;
    subscriptionId: string;
    isActive: boolean;
    isVerified: boolean;
    subscriptionStatus: boolean;
    isPopular: boolean;
    patientVideoCall: boolean;

    // User-related fields (from User entity)
    email: string;
    phone: string;
    countryCode: string;

};

const Profile = () => {
    const [data, setData] = useState<PersonalInfo>();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<PersonalInfo>({
        // Doctor entity fields
        image: undefined,
        name: "",
        categoryId: "",
        treatmentId: "",
        expertise: "",
        hospitalId: "",
        userId: "",
        desc: "", // professional bio
        education: "",
        certificate: "",
        appointmentFees: "",
        experience: "",
        timeSlot: "30",
        dob: "",
        gender: "",
        subscriptionId: "",
        isActive: false,
        isVerified: false,
        subscriptionStatus: false,
        isPopular: false,
        patientVideoCall: false,

        // User entity fields
        email: "",
        phone: "",
        countryCode: "+91",

       
    })

    // const { data, isLoading } = useSWR('/doctor/profile/me', fetcher);
    // console.log(data)
    useEffect(() => {
        try {
            setIsLoading(true);
            const response = AxiosInstance.get('/doctor/profile/me');
            setData(response);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        if (data) {
            setFormData({
                // Doctor entity fields
                image: data.image || "",
                name: data.name || "",
                categoryId: data.categoryId || "",
                treatmentId: data.treatmentId || "",
                expertise: data.expertise || "",
                hospitalId: data.hospitalId?.toString() || "",
                userId: data.userId?.toString() || "",
                desc: data.desc || "",
                education: data.education || "",
                certificate: data.certificate || "",
                appointmentFees: data.appointmentFees || "",
                experience: data.experience || "",
                timeSlot: data.timeSlot || "30",
                dob: data.dob || "",
                gender: data.gender || "",
                subscriptionId: data.subscriptionId?.toString() || "",
                isActive: data.isActive || false,
                isVerified: data.isVerified || false,
                subscriptionStatus: data.subscriptionStatus || false,
                isPopular: data.isPopular || false,
                patientVideoCall: data.patientVideoCall || false,

                // User entity fields (from relation)
                email: data.user?.email || "",
                phone: data.user?.phone || "",
                countryCode: data.user?.countryCode || "+91",
            
            });
        }
    }, [data]);

    const [educations, setEducations] = useState<Education[]>([
        { id: 1, degree: '', institution: '', year: '' }
    ]);

    const [certificates, setCertificates] = useState<Certificate[]>([
        { id: 1, name: '', year: '' }
    ]);

    // Initialize educations and certificates from form data
    useEffect(() => {
        if (formData.education) {
            try {
                const parsedEducations = JSON.parse(formData.education);
                if (Array.isArray(parsedEducations)) {
                    setEducations(parsedEducations);
                }
            } catch (error) {
                console.error('Error parsing education data:', error);
            }
        }

        if (formData.certificate) {
            try {
                const parsedCertificates = JSON.parse(formData.certificate);
                if (Array.isArray(parsedCertificates)) {
                    setCertificates(parsedCertificates);
                }
            } catch (error) {
                console.error('Error parsing certificate data:', error);
            }
        }
    }, [formData.education, formData.certificate]);

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const doctorData = {
            name: formData.name,
            categoryId: formData.categoryId,
            treatmentId: formData.treatmentId,
            expertise: formData.expertise,
            hospitalId: formData.hospitalId ? parseInt(formData.hospitalId) : null,
            userId: formData.userId ? parseInt(formData.userId) : null,
            image: formData.image,
            desc: formData.desc,
            education: educations,
            certificate: certificates,
            appointmentFees: formData.appointmentFees,
            experience: formData.experience,
            timeSlot: formData.timeSlot,
            dob: formData.dob,
            gender: formData.gender,
            subscriptionId: formData.subscriptionId ? parseInt(formData.subscriptionId) : null,
            isActive: formData.isActive,
            isVerified: formData.isVerified,
            subscriptionStatus: formData.subscriptionStatus,
            isPopular: formData.isPopular,
            patientVideoCall: formData.patientVideoCall,

            // User entity fields
            user: {
                email: formData.email,
                phone: formData.phone,
                countryCode: formData.countryCode,
            },

           
        };
       

        try {
            const response = await AxiosInstance.post(`/doctor/profile`, doctorData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            toast.success('Profile updated successfully!');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message.split(',')[0]);
                console.error('error', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
        console.log('Button clicked. Doctor data:', doctorData);
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