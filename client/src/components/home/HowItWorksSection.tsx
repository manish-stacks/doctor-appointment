import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowItWorksSectionProps {
  isDarkMode: boolean;
}

const howItWorks = [
  {
    step: '01',
    title: 'Choose Your Care',
    description: 'Select from our network of specialists or book a general consultation',
    icon: Users,
  },
  {
    step: '02',
    title: 'Book Instantly',
    description: 'Pick your preferred time slot and receive instant confirmation',
    icon: Calendar,
  },
  {
    step: '03',
    title: 'Get Treatment',
    description: 'Meet your doctor in-person or via secure video consultation',
    icon: Heart,
  },
];

export function HowItWorksSection({ isDarkMode }: HowItWorksSectionProps) {
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
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 mb-4">How It Works</Badge>
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Get Care in 3 Simple Steps
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our streamlined process makes getting quality healthcare as easy as ordering food online.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-blue-100 mb-2">{step.step}</div>
                  <CardTitle className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-center text-lg leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}