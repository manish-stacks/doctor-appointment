import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/helpers/Axios.instance';

interface TestimonialsSectionProps {
  isDarkMode: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  testimonial: string;
  rating: number;
  highlight: string;
}


export function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await AxiosInstance.get('/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error fetching testimonials', error);
    }
  };


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
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gray-100'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h3 className={`text-4xl md:text-4xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Trusted by Thousands of Patients
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real stories from patients who have transformed their healthcare experience.
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