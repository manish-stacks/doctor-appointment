import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PricingSectionProps {
  isDarkMode: boolean;
  handlePatientLogin: () => void;
}

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for occasional consultations',
    features: ['Book up to 2 appointments/month', 'Basic health records', 'Email support', 'Mobile app access', 'Prescription reminders'],
    buttonText: 'Get Started Free',
    popular: false,
    gradient: 'from-gray-50 to-gray-100',
    buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'per month',
    description: 'Ideal for regular healthcare needs',
    features: [
      'Unlimited appointments',
      'Priority booking',
      'Advanced health analytics',
      '24/7 chat support',
      'Prescription management',
      'Family member profiles',
      'Telemedicine consultations',
      'Health goal tracking',
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    gradient: 'from-blue-50 to-indigo-100',
    buttonStyle: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
  },
  {
    name: 'Family',
    price: '$49',
    period: 'per month',
    description: 'Complete healthcare for your family',
    features: [
      'Everything in Premium',
      'Up to 6 family members',
      'Dedicated family coordinator',
      'Home visit consultations',
      'Emergency hotline',
      'Annual health checkups',
      'Specialist referrals',
      'Health insurance integration',
    ],
    buttonText: 'Contact Sales',
    popular: false,
    gradient: 'from-purple-50 to-pink-100',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
  },
];

export function PricingSection({ isDarkMode, handlePatientLogin }: PricingSectionProps) {
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
          <Badge className="bg-orange-100 text-orange-700 px-4 py-2 mb-4">Pricing</Badge>
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Transparent, Affordable Healthcare
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose the plan that fits your needs. No hidden fees, no surprises, just quality healthcare at fair prices.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full ${plan.popular ? 'border-blue-500 border-2 shadow-2xl scale-105' : 'border-gray-200 shadow-lg'} ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : `bg-gradient-to-br ${plan.gradient}`} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 text-sm font-bold shadow-lg">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-2xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</CardTitle>
                  <div className="mt-6">
                    <span className={`text-5xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                    {plan.price !== 'Free' && (
                      <span className={`ml-2 transition-colors duration-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className={`mt-4 text-lg transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : ''}`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className={`transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${plan.buttonStyle}`}
                    onClick={handlePatientLogin}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}