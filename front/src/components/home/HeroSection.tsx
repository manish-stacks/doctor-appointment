'use client';
import { Button } from '@/components/ui/button';
import { Zap, Globe, CheckCircle, Stethoscope, Pill } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  isDarkMode: boolean;
  handlePatientLogin: () => void;
}

const AnimatedStethoscope = () => (
  <motion.div
    variants={{
      animate: {
        y: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      },
    }}
    animate="animate"
    className="absolute top-20 right-10 text-blue-400 opacity-20"
  >
    <Stethoscope size={120} />
  </motion.div>
);

const AnimatedPills = () => (
  <motion.div
    variants={{
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      },
    }}
    animate="animate"
    className="absolute bottom-20 left-10 text-green-400 opacity-20"
  >
    <Pill size={80} />
  </motion.div>
);

export function HeroSection({ isDarkMode, handlePatientLogin }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const [positions, setPositions] = useState<{ left: string; top: string }[]>([]);
  useEffect(() => {
    // Generate random positions on client side only
    const newPositions = [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setPositions(newPositions);
  }, []);


  return (
    <motion.section
      className={`relative py-20 overflow-hidden cursor-pointer transition-all duration-500 ${isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 hover:from-gray-800 hover:via-blue-800 hover:to-purple-800'
          : 'bg-gradient-to-br  from-blue-100 via-blue-50 to-purple-100 hover:from-blue-100 hover:via-blue-100 hover:to-purple-100'
        }`}
      whileHover={{ scale: 1.002, transition: { duration: 0.3 } }}
      style={{
        boxShadow: isDarkMode
          ? '0 0 0 1px rgba(59, 130, 246, 0.1), 0 10px 40px rgba(0, 0, 0, 0.3)'
          : '0 0 0 1px rgba(59, 130, 246, 0.1), 0 10px 40px rgba(59, 130, 246, 0.1)',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={`absolute inset-0 border-2 transition-all duration-500 ${isDarkMode ? 'border-transparent hover:border-blue-400/30' : 'border-transparent hover:border-blue-300/50'
          }`}
        whileHover={{
          boxShadow: isDarkMode
            ? '0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(59, 130, 246, 0.1)'
            : '0 0 60px rgba(59, 130, 246, 0.15), inset 0 0 60px rgba(59, 130, 246, 0.05)',
          transition: { duration: 0.4 },
        }}
      />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-20 hover:opacity-30' : 'opacity-20 hover:opacity-40'}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {positions.map((position, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-blue-400 opacity-10 hover:opacity-20' : 'bg-blue-300 opacity-10 hover:opacity-25'
              }`}
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 360] }}
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}


        <motion.div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode
              ? 'bg-gradient-to-r from-blue-900/0 via-purple-900/0 to-blue-900/0 hover:from-blue-900/10 hover:via-purple-900/10 hover:to-blue-900/10'
              : 'bg-gradient-to-r from-blue-100/0 via-purple-100/0 to-blue-100/0 hover:from-blue-100/30 hover:via-purple-100/30 hover:to-blue-100/30'
            }`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
      <AnimatedStethoscope />
      <AnimatedPills />
      <motion.div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-10" animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-10" animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
              🎉 Now serving 50,000+ patients nationwide
            </Badge>
          </motion.div>
          <motion.h2 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} variants={itemVariants}>
            Healthcare Made
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Simple & Accessible</span>
          </motion.h2>
          <motion.p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} variants={itemVariants}>
            Connect with top-rated doctors, book appointments instantly, and manage your health journey with our award-winning platform trusted by thousands.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" variants={itemVariants}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={handlePatientLogin}
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
              <Globe className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>
          <motion.div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}