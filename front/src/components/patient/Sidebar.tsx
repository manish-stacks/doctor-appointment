import React from 'react'
import { Bell, Calendar, FileText, LayoutDashboard, LogOut, MessageSquare, Settings, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
interface NavigationItem {
    label: string;
    icon: React.ElementType;
    path: string;
}

interface propInterface {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void
}

const navigation: NavigationItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
    { icon: User, label: 'My Profile', path: '/patient/profile' },
    { icon: MessageSquare, label: 'Messages', path: '/patient/messages' },
    { icon: Bell, label: 'Notifications', path: '/patient/notifications' },
    { icon: FileText, label: 'Medical Records', path: '/patient/records' },
    { icon: Settings, label: 'Settings', path: '/patient/settings' },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, logout }: propInterface) => {
    const pathname = usePathname();


    return (
        <>
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="h-16 flex items-center justify-between px-4 shadow-sm">
                    <h1 className="text-2xl font-bold text-indigo-900">MediDash</h1>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6">
                    <div className="space-y-1">
                        {navigation.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.path;

                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
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
                    <button onClick={() => logout()} className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 w-full">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar