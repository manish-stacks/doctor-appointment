import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Award, Clock, Heart, Phone, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CTASection = ({ isDarkMode, handlePatientLogin }: { isDarkMode: boolean; handlePatientLogin: () => void }) => {
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
      className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div variants={itemVariants}>
          <Badge className="bg-white/20 text-white px-4 py-2 mb-6">Ready to Get Started?</Badge>
        </motion.div>
        <motion.h3
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={itemVariants}
        >
          Transform Your Healthcare Today
        </motion.h3>
        <motion.p
          className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Join over 50,000 patients and 500+ doctors who trust MediCare+ for their healthcare needs. Start your journey to better health today.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={itemVariants}>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={handlePatientLogin}
          >
            <Heart className="w-5 h-5 mr-2" />
            Start Free Today
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={`border-2 border-white/30  hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-blue-600'}`}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call (555) 123-4567
          </Button>
        </motion.div>
        <motion.div
          className="mt-12 flex justify-center items-center space-x-8 text-sm text-blue-200"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Award Winning</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
