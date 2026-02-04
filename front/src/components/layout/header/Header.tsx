'use client';
import { useState, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { TopInfoBar } from './TopInfoBar';
import { MobileMenuSidebar } from './MobileMenuSidebar';
import { DesktopInfoSidebar } from './DesktopInfoSidebar';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { userDetails as UserDetailsType } from '@/types/store';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';


export default function Header() {

  const { openLoginModal } = useUIStore();
  const { logout } = useUserStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const router = useRouter();

  const getUserDetails = useUserStore((state) => state.getUserDetails);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [userdata, setUserData] = useState<UserDetailsType>();

  useEffect(() => {
    if (isLoggedIn) {
      const details = getUserDetails();
      if (!details) {
        console.warn('No user details available');
        return;
      }
      setUserData(details);
    }
  }, [isLoggedIn, getUserDetails]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const redirectToDashboard = () => {
    console.log(userdata?.role)

    if (userdata?.role === 'patient' || userdata?.role === 'user') {
      router.push('/patient/dashboard');
    } else if (userdata?.role === 'doctor') {
      router.push('/doctor/dashboard');
    }
  };

  return (
    <>
      <TopInfoBar />
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg width="50" height="50" viewBox="0 0 50 50" className="text-[#0ea5e9]">
                  <path
                    d="M25 5 C15 5, 8 12, 8 22 C8 28, 10 32, 15 38 L25 48 L35 38 C40 32, 42 28, 42 22 C42 12, 35 5, 25 5 Z"
                    fill="currentColor"
                    opacity="0.15"
                  />
                  <circle cx="25" cy="22" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M25 17 L25 27 M20 22 L30 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  MediCare<span className="text-[#0ea5e9]">+</span>
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <Link href="/" className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                  Home
                </Link>
              </div>

              <div className="relative group">
                <button className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                  Pages
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0ea5e9] transition-colors">About Us</Link>
                    <Link href="/terms-conditions" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0ea5e9] transition-colors">Terms & Conditions</Link>
                    <Link href="/privacy-policy" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0ea5e9] transition-colors">Privacy Policy</Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link href="/our-experts" className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                  Doctors
                </Link>
              </div>
              <div className="relative group">
                <Link href="/price" className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                  Price
                </Link>
              </div>

              <div className="relative group">
                <Link href="/blogs" className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors flex items-center gap-1">
                  Blog
                </Link>
              </div>

              <Link href="/contact" className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors">
                Contacts
              </Link>


            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block group">
                {/* Trigger */}
                <button className="flex items-center gap-2 bg-[#0f3460] hover:bg-[#1a2e4a] text-white px-4 py-2 rounded-full transition-all">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {isLoggedIn ? userdata?.username : "Account"}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border opacity-0 scale-95 invisible  group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 z-50">

                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-800">
                          {userdata?.role === 'patient' || userdata?.role === 'user'
                            ? userdata?.username
                            : `Dr. ${userdata?.username}`}
                        </p>
                      </div>

                      <button
                        onClick={redirectToDashboard}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
                      >
                        Dashboard
                      </button>

                      <button
                        onClick={() => logout()}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition rounded-b-xl"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={openLoginModal}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition rounded-t-xl"
                      >
                        Login as Patient
                      </button>

                      <Link
                        href="/for-doctors"
                        className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition rounded-b-xl"
                      >
                        Login as Doctor
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Desktop Dots Button */}
              <button
                onClick={() => setIsDesktopSidebarOpen(true)}
                className="hidden lg:block p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-700 rounded-full"></div>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Desktop Info Sidebar */}
      <DesktopInfoSidebar isOpen={isDesktopSidebarOpen} onClose={() => setIsDesktopSidebarOpen(false)} />
    </>
  );
}


