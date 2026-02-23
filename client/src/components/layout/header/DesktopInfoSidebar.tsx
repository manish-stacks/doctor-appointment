import { Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";

export function DesktopInfoSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b1030]/20 z-40 transition-opacity duration-300 cursor-pointer backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Sidebar */}
      <div
        className={`fixed top-[150px] right-20 z-50 w-[400px] h-[600px] 
        bg-[#0b1030] text-white rounded-[30px] shadow-2xl 
        transform transition-all duration-300 p-[20px]
        ${isOpen ? 'opacity-100' : '-translate-y-1/2 translate-x-10 opacity-0'}
        overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white hover:text-[#0ea5e9]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 50 50" className="text-[#0ea5e9]">
              <circle cx="25" cy="25" r="22" fill="currentColor" opacity="0.15" />
              <path d="M25 15v20M15 25h20" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <h1 className="text-xl font-bold">
              MediCare<span className="text-[#0ea5e9]">+</span>
            </h1>
          </div>
        </div>

        {/* About */}
        <div className="p-8 border-b border-white/10">
          <h2 className="text-lg font-semibold mb-3">About Us</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            At MediCare, we are dedicated to delivering exceptional healthcare with compassion, innovation, and integrity.
          </p>
        </div>

        {/* Contact */}
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-3">Contact Info</h2>
          <div className="space-y-2 text-sm text-white/80">
            <p>MediCare3456mail@gmail.com</p>
            <p>+211 567 811</p>
            <p>231 Utah City Centre, Utah, USA</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 bg-[#0ea5e9] rounded-full flex items-center justify-center hover:bg-[#0ea5e9]/80 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}