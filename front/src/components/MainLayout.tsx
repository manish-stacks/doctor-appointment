"use client";
import React from "react";
import { usePathname } from "next/navigation";
import PatientLayout from "./patient/Layout";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isPatientRoute = pathname!.startsWith("/patient");
    const isDoctorRoute = pathname!.startsWith("/doctor");


    if (isPatientRoute) {
        return (
            <>
                <PatientLayout>
                    {children}
                </PatientLayout>
            </>
        )
    }
    if (isDoctorRoute) {
        return (
            <>
                <PatientLayout>
                    {children}
                </PatientLayout>
            </>
        )
    }

    return <>{children}</>;
};

export default MainLayout;