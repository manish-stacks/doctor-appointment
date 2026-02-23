import { useUIStore } from "@/store/uiStore";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Moon, Sun, Twitter, Youtube } from "lucide-react";
import { motion } from 'framer-motion';

export function TopInfoBar() {

  const { currentLocation, isDarkMode, toggleDarkMode } = useUIStore();


  return (
    <div className="bg-[#0f3460] text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm px-4">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xs md:text-sm">Mon - Fri : 8:00 -16:00</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>medicareservices@gmail.com</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{currentLocation}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleDarkMode}
            className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-colors
            ${isDarkMode ? 'bg-gray-700 border border-yellow-400' : 'bg-gray-300'}`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className={`w-5 h-5 rounded-full flex items-center justify-center
              ${isDarkMode ? 'bg-yellow-400 text-gray-900 ' : 'bg-white text-gray-600'}`}
            >
              {isDarkMode ? (
                <Sun className="w-3 h-3" />
              ) : (
                <Moon className="w-3 h-3" />
              )}
            </motion.div>
          </motion.button>


          <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" />
          <Instagram className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" />
          <Twitter className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" />
          <Linkedin className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" />
          <Youtube className="w-4 h-4 cursor-pointer hover:text-blue-300 transition-colors" />
        </div>
      </div>
    </div>
  );
}