"use client"
import React, { useState, useRef, useEffect } from 'react';
import { userDetails, useUserStore } from '@/store/useUserStore';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userDetails = useUserStore((state) => state.userDetails);
    const [userdata, setUserData] = useState<userDetails>();
    const logout = useUserStore((state) => state.logout);

    useEffect(() => {
        if (!userDetails) {
            console.warn('No user details available');
            return;
        }
        try {
            setUserData(userDetails);
            console.log('User data updated:', userDetails);
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
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <Header setSidebarOpen={setSidebarOpen} setProfileDropdownOpen={setProfileDropdownOpen} profileDropdownOpen={profileDropdownOpen} dropdownRef={dropdownRef} userData={userdata} logout={logout} />

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

