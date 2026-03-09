import { Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenuSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:hidden overflow-y-auto`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 50 50" className="text-[#0ea5e9]">
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
            <h1 className="text-xl font-bold text-gray-900">
              MediCare<span className="text-[#0ea5e9]">+</span>
            </h1>
          </Link>
          <button onClick={onClose} className="text-[#0ea5e9] hover:text-blue-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0ea5e9]"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-[#1a2332] text-white rounded-r-lg hover:bg-[#0ea5e9] transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="px-6 pb-6">
        <div className="space-y-1">
          {/* Home */}
          <div className="border-b border-gray-200">
            <Link
              href="/"
              className="w-full flex items-center justify-between py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors"
            >
              <span>Home</span>
            </Link>
          </div>

          {/* Pages */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleDropdown('pages')}
              className="w-full flex items-center justify-between py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors"
            >
              <span>Pages</span>
              <svg className={`w-5 h-5 transition-transform ${openDropdown === 'pages' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'pages' && (
              <div className="pl-4 pb-2 space-y-2">
                <Link href="/about-us" className="block py-2 text-gray-600 hover:text-[#0ea5e9]">About Us</Link>
                <Link href="/terms" className="block py-2 text-gray-600 hover:text-[#0ea5e9]">Terms & Conditions</Link>
                <Link href="/privacy" className="block py-2 text-gray-600 hover:text-[#0ea5e9]">Privacy Policy</Link>
              </div>
            )}
          </div>

          {/* Doctors */}
          <div className="border-b border-gray-200">
            <Link
              href="/our-experts"
              className="w-full flex items-center justify-between py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors"
            >
              <span>Doctors</span>
            </Link>

          </div>
          <div className="border-b border-gray-200">
            <Link
              href="/price"
              className="w-full flex items-center justify-between py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors"
            >
              <span>Price</span>
            </Link>

          </div>

          {/* Blog */}
          <div className="border-b border-gray-200">
            <Link
              href="/blog"
              className="w-full flex items-center justify-between py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors"
            >
              <span>Blog</span>
            </Link>
          </div>

          {/* Contacts */}
          <div className="border-b border-gray-200">
            <Link href="/contacts" className="block py-4 text-gray-900 font-medium hover:text-[#0ea5e9] transition-colors">
              Contacts
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}