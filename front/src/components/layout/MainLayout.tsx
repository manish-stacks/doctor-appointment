"use client"
import React from 'react';
import { FrontEndLayout } from './FrontEndLayout';
import { usePathname } from 'next/navigation';
import AdminLayout from './admin/AdminLayout';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isPatientRoute = pathname?.startsWith("/patient");
    const isDoctorRoute = pathname?.startsWith("/doctor");
    const Layout = (isDoctorRoute || isPatientRoute) ? AdminLayout : FrontEndLayout;
    return <Layout>{children}</Layout>;
};
