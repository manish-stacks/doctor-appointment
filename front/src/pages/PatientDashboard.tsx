"use client"
import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  User,
  ChevronDown,
  LogOut,
  UserCircle,
  Clock,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

export function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/patient-dashboard/appointments' },
    { icon: User, label: 'My Profile', path: '/patient-dashboard/profile' },
    { icon: MessageSquare, label: 'Messages', path: '/patient-dashboard/messages' },
    { icon: Bell, label: 'Notifications', path: '/patient-dashboard/notifications' },
    { icon: FileText, label: 'Medical Records', path: '/patient-dashboard/records' },
    { icon: Settings, label: 'Settings', path: '/patient-dashboard/settings' },
  ];

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
                  //onClick={() => setIsOpen(false)}
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

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
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
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Doctor profile"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="hidden md:flex items-center">
                  <span className="text-sm font-medium text-gray-700">Dr. Sarah Wilson</span>
                  <ChevronDown className={`h-4 w-4 ml-1 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                    <p className="text-xs text-gray-500">sarah.wilson@medidash.com</p>
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
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome back, Dr. Wilson</h2>
            <p className="text-gray-600">Your dashboard content goes here.</p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-3">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="text-lg lg:text-xl font-semibold">Next Appointment</h3>
              <p className="text-gray-600 mt-2">March 15, 2024</p>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <Clock className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="text-lg lg:text-xl font-semibold">Upcoming</h3>
              <p className="text-gray-600 mt-2">2 appointments</p>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <FileText className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="text-lg lg:text-xl font-semibold">Medical Records</h3>
              <button className="text-indigo-600 mt-2">View</button>
            </div>
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <User className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="text-lg lg:text-xl font-semibold">Profile</h3>
              <button className="text-indigo-600 mt-2">Edit</button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4">Find a Doctor</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search by name or specialty"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4">Recent Appointments</h2>
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-semibold">Dr. John Smith</p>
                        <p className="text-gray-600">General Checkup</p>
                      </div>
                      <p className="text-gray-600">March 1, 2024</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

