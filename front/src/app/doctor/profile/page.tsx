import EducationCertificates from '@/components/doctor/profile/EducationCertificates'
import OtherInformation from '@/components/doctor/profile/OtherInformation'
import PersonalInformationForm from '@/components/doctor/profile/PersonalInformationForm'
import React from 'react'

const Profile = () => {
    return (
        <>
            <PersonalInformationForm />
            <EducationCertificates />
            <OtherInformation />
        </>
    )
}

export default Profile