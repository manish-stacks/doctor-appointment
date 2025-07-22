import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesSectionProps {
  isDarkMode: boolean;
}

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-powered appointment booking that finds the perfect time slot for you',
    color: 'blue',
  },
  {
    icon: Clock,
    title: '24/7 Telemedicine',
    description: 'Connect with doctors instantly through video consultations anytime',
    color: 'green',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Access to 500+ certified specialists across 50+ medical fields',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'Bank-level security with end-to-end encryption for your privacy',
    color: 'orange',
  },
];

export function FeaturesSection({ isDarkMode }: FeaturesSectionProps) {
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
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">Features</Badge>
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose MediCare+?
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience the future of healthcare with our comprehensive platform designed for modern patients and healthcare providers.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-white to-gray-50'}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className={`text-xl font-bold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-center leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}