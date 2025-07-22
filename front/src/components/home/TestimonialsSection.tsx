import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  isDarkMode: boolean;
}

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Working Mother',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'MediCare+ made it incredibly easy to find a pediatrician for my daughter. The booking process was seamless, and Dr. Martinez was thorough and caring. The telemedicine feature is a game-changer for busy parents!',
    highlight: 'Saved 3 hours per appointment',
  },
  {
    name: 'Michael Chen',
    role: 'Senior Executive',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'As someone with a demanding schedule, being able to book appointments online and get instant confirmations has been revolutionary. The quality of care and professionalism of doctors is outstanding.',
    highlight: 'Reduced wait times by 80%',
  },
  {
    name: 'Emily Rodriguez',
    role: 'College Student',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'The affordable pricing and easy access to specialists helped me get the mental health support I needed without breaking the bank. The platform is intuitive and the doctors genuinely care.',
    highlight: 'Affordable student pricing',
  },
  {
    name: 'David Thompson',
    role: 'Retiree',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'The platform is surprisingly user-friendly for someone my age. The customer support team was patient and walked me through everything. Now I can easily manage all my appointments and prescriptions.',
    highlight: 'Senior-friendly interface',
  },
  {
    name: 'Lisa Park',
    role: 'Small Business Owner',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'Having all my family\'s health records in one secure place and being able to book for everyone is incredibly convenient. The family plan offers excellent value and peace of mind.',
    highlight: 'Manages 5 family members',
  },
  {
    name: 'James Wilson',
    role: 'Teacher',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    testimonial: 'The emergency consultation feature literally saved my life during a health scare. Being able to connect with a doctor immediately at 2 AM gave me the guidance I needed before heading to the ER.',
    highlight: '24/7 emergency access',
  },
];

export function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {
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
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradientbeespace-to-br from-gray-50 to-blue-50'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2 mb-4">Testimonials</Badge>
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Trusted by Thousands of Patients
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real stories from patients who have transformed their healthcare experience with MediCare+.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100" />
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                      <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                      <p className={`text-xs transition-colors duration-500 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`italic leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>&quot;{testimonial.testimonial}&quot;</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}