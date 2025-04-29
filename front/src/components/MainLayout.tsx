"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Layout from "./Layout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    
    const pathname = usePathname();
    const isPatientRoute = pathname!.startsWith("/patient");
    const isDoctorRoute = pathname!.startsWith("/doctor");

    if (isDoctorRoute || isPatientRoute) {
        return (
            <>
                <Layout>
                    {children}
                </Layout>
            </>
        )
    }

    return <>{children}</>;
};

export default MainLayout;