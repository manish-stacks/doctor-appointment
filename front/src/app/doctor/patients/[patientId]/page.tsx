"use client";

import React from 'react'
import AppointmentTable from '../../appointments/page'
import { useParams } from "next/navigation";

const PatientAppointment = () => {
    const { patientId } = useParams<{ patientId: string }>() || {};

    return (
        <>
            <AppointmentTable patientId={Number(patientId)} />
        </>
    )
}

export default PatientAppointment
