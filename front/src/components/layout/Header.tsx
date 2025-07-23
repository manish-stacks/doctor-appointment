'use client';

import { Button } from '@/components/ui/button';
import { Heart, Navigation, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  handlePatientLogin: () => void;
  currentLocation: string;
  isLocationLoading: boolean;
}

export default function Header({
  isDarkMode,
  toggleTheme,
  handlePatientLogin,
  currentLocation,
  isLocationLoading,
}: HeaderProps) {



  const goDoctorLogin = () => {
    window.location.href = '/for-doctors';
  };
  
  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-7 h-7 text-white" />
              </motion.div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent ${isDarkMode ? 'text-white' : ''}`}>
                MediCare+
              </h1>
              <p className="text-xs text-gray-500 font-medium">Your Health Partner</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <Navigation className={`w-4 h-4 ${isLocationLoading ? 'animate-pulse' : ''} ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="text-sm font-medium">{currentLocation}</span>
            </motion.div>
            
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <Button onClick={goDoctorLogin} variant="ghost" className="hidden md:flex text-gray-600 hover:text-blue-600">
              For Doctors
            </Button>
            <Link href="/about-us"  className="hidden md:flex text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Button
              onClick={handlePatientLogin}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}