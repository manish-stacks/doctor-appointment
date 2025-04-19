import { userDetails } from '@/store/useUserStore';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, UserCircle } from 'lucide-react'
import React from 'react'
interface headerInterface {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profileDropdownOpen: boolean;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    userData: userDetails | undefined;
    logout: () => void
}
const Header = ({ setSidebarOpen, setProfileDropdownOpen, profileDropdownOpen, dropdownRef, userData, logout }: headerInterface) => {
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
                            className="pl-10 pr-10 py-2 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>
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
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <UserCircle className="h-4 w-4 mr-2" />
                                    View Profile
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Account Settings
                                </a>
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

export default Header