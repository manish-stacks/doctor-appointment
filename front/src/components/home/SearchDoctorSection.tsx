import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SearchDoctorSectionProps {
  isDarkMode: boolean;
  handlePatientLogin: () => void;
}

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 127,
    experience: '15+ years',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    nextAvailable: 'Today 2:00 PM',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviews: 89,
    experience: '12+ years',
    image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    nextAvailable: 'Tomorrow 10:30 AM',
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 5.0,
    reviews: 156,
    experience: '18+ years',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    nextAvailable: 'Today 4:15 PM',
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    rating: 4.9,
    reviews: 203,
    experience: '20+ years',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    nextAvailable: 'This Week',
  },
];

export function SearchDoctorSection({ isDarkMode, handlePatientLogin }: SearchDoctorSectionProps) {
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
      className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="bg-indigo-100 text-indigo-700 px-4 py-2 mb-4">Find Your Doctor</Badge>
          <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Search & Connect with Top Doctors
          </h3>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find the perfect healthcare provider based on your needs, location, and preferences. All our doctors are verified and highly rated.
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <Card className={`border-0 shadow-2xl p-8 ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="specialty" className={`text-sm font-semibold transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Medical Specialty
                </Label>
                <select id="specialty" className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="">Select Specialty</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurology">Neurology</option>
                  <option value="gynecology">Gynecology</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="general">General Medicine</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className={`text-sm font-semibold transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </Label>
                <Input id="location" placeholder="Enter city or zip code" className="p-5 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability" className={`text-sm font-semibold transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Availability
                </Label>
                <select id="availability" className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="">Any time</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This week</option>
                  <option value="next-week">Next week</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handlePatientLogin}
              >
                <Users className="w-5 h-5 mr-2" />
                Search Doctors
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold"
                onClick={handlePatientLogin}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Browse All Doctors
              </Button>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-16">
          <h4 className={`text-2xl font-bold text-center mb-8 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Doctors
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
                    />
                    <h5 className={`font-bold text-lg mb-1 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doctor.name}</h5>
                    <p className="text-blue-600 font-medium text-sm mb-3">{doctor.specialty}</p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className={`font-semibold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doctor.rating}</span>
                      <span className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({doctor.reviews} reviews)</span>
                    </div>
                    <p className={`text-sm mb-3 transition-colors duration-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{doctor.experience} experience</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
                      Next: {doctor.nextAvailable}
                    </Badge>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg" onClick={handlePatientLogin}>
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}