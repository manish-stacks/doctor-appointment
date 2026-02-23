"use client"
import React, { useState, useRef, useEffect } from 'react';
import { userDetails, useUserStore } from '@/store/useUserStore';

import AdminNavigation from './AdminNavigation';
import AdminSidebar from './AdminSidebar';

// import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userDetails = useUserStore((state) => state.getUserDetails);
    const [userdata, setUserData] = useState<userDetails>();
    const logout = useUserStore((state) => state.logout);
    // const pathname = usePathname();
    // console.log(pathname?.startsWith("/patient"), pathname?.startsWith("/doctor"));
    // const isPatientRoute = pathname!.startsWith("/patient");
    // const isDoctorRoute = pathname!.startsWith("/doctor");

    useEffect(() => {
        const details = userDetails();
        if (!details) {
            console.warn('No user details available');
            return;
        }
        try {
            setUserData(details);
        } catch (error) {
            console.error('Error setting user data:', error);
        }
    }, [userDetails])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "user_store" && !event.newValue) {
                console.log("Logout triggered from user_store localStorage change");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        let previousToken = document.cookie;
        const interval = setInterval(() => {
            const currentToken = document.cookie;
            if (previousToken !== currentToken) {
                const tokenDeleted = !/token=/.test(currentToken);
                if (tokenDeleted) {
                    console.log("Logout triggered from token cookie change");
                }
                previousToken = currentToken;
            }
        }, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);



    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <AdminNavigation setSidebarOpen={setSidebarOpen} setProfileDropdownOpen={setProfileDropdownOpen} profileDropdownOpen={profileDropdownOpen} dropdownRef={dropdownRef} userData={userdata} logout={logout} />

                {/* Main Content Area with Scroll */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

