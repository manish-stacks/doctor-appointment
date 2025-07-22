import React from 'react'
import { CheckCircle, Smartphone} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function MobileAppSection({ isDarkMode }: { isDarkMode: boolean }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2 mb-6">Mobile App</Badge>
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Healthcare in Your Pocket
            </h3>
            <p className={`text-xl mb-8 leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Download our award-winning mobile app and access quality healthcare anytime, anywhere. Available on iOS and Android.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Book appointments on the go',
                'Video consultations with doctors',
                'Prescription management & refills',
                'Health records & lab results',
                'Appointment reminders & notifications',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className={`transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl">
                <Smartphone className="w-5 h-5 mr-2" />
                Download iOS
              </Button>
              <Button variant="outline" className="border-2 border-gray-300 px-6 py-3 rounded-xl">
                <Smartphone className="w-5 h-5 mr-2" />
                Download Android
              </Button>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="relative">
            <div className={`rounded-3xl p-1 text-center ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-100 to-indigo-200'}`}>
              {/* <Smartphone className="w-32 h-32 text-blue-600 mx-auto mb-4" /> */}
              {/* <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mobile app mockup coming soon</p> */}
              <Image
                src="/img/coming-soon.png"
                width={600}
                height={380}
                alt="Mobile App Mockup"
                className="w-full rounded-3xl h-80 object-cover shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
