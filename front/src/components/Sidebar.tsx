"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    FileText,
    Settings,
    MessageSquare,
    Bell,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    role: 'doctor' | 'patient';
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const doctorLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor-dashboard' },
        { icon: Calendar, label: 'Appointments', path: '/doctor-dashboard/appointments' },
        { icon: Users, label: 'Patients', path: '/doctor-dashboard/patients' },
        { icon: MessageSquare, label: 'Messages', path: '/doctor-dashboard/messages' },
        { icon: Bell, label: 'Notifications', path: '/doctor-dashboard/notifications' },
        { icon: FileText, label: 'Reports', path: '/doctor-dashboard/reports' },
        { icon: Settings, label: 'Settings', path: '/doctor-dashboard/settings' },
    ];

    const patientLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/patient-dashboard' },
        { icon: Calendar, label: 'Appointments', path: '/patient-dashboard/appointments' },
        { icon: User, label: 'My Profile', path: '/patient-dashboard/profile' },
        { icon: MessageSquare, label: 'Messages', path: '/patient-dashboard/messages' },
        { icon: Bell, label: 'Notifications', path: '/patient-dashboard/notifications' },
        { icon: FileText, label: 'Medical Records', path: '/patient-dashboard/records' },
        { icon: Settings, label: 'Settings', path: '/patient-dashboard/settings' },
    ];

    const links = role === 'doctor' ? doctorLinks : patientLinks;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-40
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
        w-64
      `}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-900">MediCare</h1>
                </div>

                <nav className="mt-6">
                    <div className="space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.path;

                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive
                                            ? 'text-indigo-600 bg-indigo-50 border-r-2 border-indigo-600'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <button className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 w-full">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}