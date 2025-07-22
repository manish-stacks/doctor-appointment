import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsSectionProps {
  isDarkMode: boolean;
}

const stats = [
  { number: '50K+', label: 'Happy Patients', icon: Users },
  { number: '500+', label: 'Expert Doctors', icon: Award },
  { number: '50+', label: 'Specialties', icon: Heart },
  { number: '4.9/5', label: 'Patient Rating', icon: Star },
];

export function StatsSection({ isDarkMode }: StatsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className={`py-16 backdrop-blur-sm transition-colors duration-500 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center group" variants={itemVariants}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.number}
              </div>
              <div className={`font-medium transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}