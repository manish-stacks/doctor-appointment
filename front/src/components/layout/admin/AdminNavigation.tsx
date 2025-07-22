import { userDetails } from '@/store/useUserStore';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, UserCircle } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
interface headerInterface {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profileDropdownOpen: boolean;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    userData: userDetails | undefined;
    logout: () => void
}

const AdminNavigation = ({ setSidebarOpen, setProfileDropdownOpen, profileDropdownOpen, dropdownRef, userData, logout }: headerInterface) => {
    const [showNotifications, setShowNotifications] = React.useState(false);

    return (
        <>
            <header className="sticky top-0 z-30 h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8">
                <div className="flex items-center">
                    <button className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="relative max-[567px]:hidden">
                        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-10 py-2  focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block">
                        <div
                            className="relative"
                            onClick={() => setShowNotifications(!showNotifications)}
                            //   onMouseEnter={() => setShowNotifications(true)}
                            //   onMouseLeave={() => setShowNotifications(false)}
                        >
                            <Bell className="h-6 w-6 text-gray-600" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>

                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="text-sm font-semibold">Notifications</h3>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {/* Sample notifications */}
                                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                            <p className="text-sm text-gray-800">New appointment request from John Doe</p>
                                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                        </div>
                                        <div className="px-4 py-3 hover:bg-gray-50">
                                            <p className="text-sm text-gray-800">Your appointment is confirmed</p>
                                            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <Link href={userData?.role === 'patient' ? "/patient/notifications" : "/doctor/notifications"} className="text-sm text-blue-600 hover:underline">View all notifications</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center space-x-3 focus:outline-none"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        >
                            <img
                                src={userData?.image}
                                alt="Doctor profile"
                                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                            />
                            <div className="hidden md:flex items-center">
                                <span className="text-sm font-medium text-gray-700">{userData?.username || 'User'}</span>
                                <ChevronDown className={`h-4 w-4 ml-1 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {/* Profile Dropdown */}
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-lg py-1 ring-1 ring-black/10 ring-opacity-5">
                                <div className="px-4 py-2 border-b border-slate-200">
                                    <p className="text-sm font-medium text-gray-900">{userData?.username || 'User'}</p>
                                    <p className="text-xs text-gray-500">{userData?.email || 'example@gmail.com'}</p>
                                </div>
                                <Link
                                    href={userData?.role === 'patient' ? "/patient/profile" : "/doctor/profile"}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <UserCircle className="h-4 w-4 mr-2" />
                                    View Profile
                                </Link>
                                <Link
                                    href={userData?.role === 'patient' ? "/patient/settings" : "/doctor/settings"}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Account Settings
                                </Link>
                                <div className="border-t">
                                    <button
                                        onClick={() => logout()}
                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default AdminNavigation