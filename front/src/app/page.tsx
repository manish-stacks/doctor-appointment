"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Star, Users, CheckCircle2 } from 'lucide-react';
import { InfiniteMovingCards } from '@/components/home/InfiniteMovingCards';
import { doctors, plans, testimonials } from '@/constant/home-page';
import { useRouter } from 'next/navigation';
import { RegisterModal } from '@/components/RegisterModal';
import { AuthModal } from '@/components/AuthModal';




export default function Home() {
 
  const navigate = useRouter();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerStep, setRegisterStep] = useState<'role' | 'phone'>('role');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleRoleSelect = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    setRegisterStep('phone');
  };

  const handlePhoneSubmit = (phone: string) => {
    setIsRegisterModalOpen(false);
    // In a real app, you'd handle authentication here
    // For demo, we'll just navigate to the dashboard
    navigate.push(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-[#045d59]">MediCare</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[#045d59] hover:text-indigo-800"
              >
                Login
              </button>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-[#045d59] text-white px-4 py-2 rounded-full hover:bg-indigo-900 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[#06928b] font-semibold text-sm uppercase tracking-wider">
              Welcome to MediCare
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health, <br />
              <span className="text-[#045d59]">Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Connect with top-rated doctors, schedule appointments instantly, and receive quality healthcare from the comfort of your home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#045d59] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#203b3a] transition-colors flex items-center justify-center"
            >
              Book Appointment
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </motion.button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-900">2000+</span>
              <span className="text-gray-600">Patients Served</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-900">200+</span>
              <span className="text-gray-600">Expert Doctors</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-900">24/7</span>
              <span className="text-gray-600">Online Support</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-indigo-100 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-70"></div>
            <img
              src="./img/1696951125615.png"
              alt="Doctor with patient"
              className="relative z-10 w-[80%] h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-[#045d59] to-[#045d59]">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Calendar className="w-12 h-12 text-rose-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">Book appointments instantly with our intuitive scheduling system</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Users className="w-12 h-12 text-rose-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Access to a network of qualified healthcare professionals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <Clock className="w-12 h-12 text-rose-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for all your healthcare needs</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className='bg-gradient-to-t from-white to-purple-50'>
        <div className="container mx-auto px-4 py-16 ">
          <div className="text-center mb-12">
            <span className="text-[#045d59] font-medium text-sm uppercase tracking-wider">Medical Specialists</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Meet Our Expert Doctors</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Choose from our team of qualified healthcare professionals who are here to provide you with the best medical care</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden mb-6">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#045d59] transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-[#045d59] font-medium mb-3">{doctor.specialty}</p>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="text-sm text-gray-500">
                      <Users className="w-4 h-4 inline mr-1" />
                      {doctor.reviews} patients
                    </span>
                    <span className="text-sm text-gray-500">
                      <Star className="w-4 h-4 inline mr-1" />
                      {doctor.reviews} reviews
                    </span>
                  </div>
                  <button className="w-full bg-indigo-50 text-[#045d59] py-3 rounded-xl font-semibold hover:bg-[#045d59] hover:text-white transition-all duration-300">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center text-[#045d59] font-semibold hover:text-indigo-800"
            >
              View All Doctors
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>
      {/* Pricing Plans */}
      <section className="bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 py-16 ">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-medium text-sm uppercase tracking-wider">Pricing Options</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Choose Your Perfect Plan</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Select the plan that best suits your healthcare needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative ${plan.featured
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white transform scale-105'
                  : 'bg-white'
                  } rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300`}
              >
                {plan.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white px-3 py-1 rounded-full text-purple-600 text-sm font-medium">
                      Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className={`text-5xl font-extrabold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`ml-2 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-500'}`}>/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className={`w-5 h-5 mr-3 ${plan.featured
                          ? 'text-white'
                          : typeof feature === 'string' ? 'text-purple-500' : 'text-gray-300'
                          }`} />
                        <span className={`${plan.featured
                          ? 'text-white/90'
                          : typeof feature === 'string' ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                          {typeof feature === 'string' ? feature : feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all
                  ${plan.featured
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                    } shadow-lg hover:shadow-xl`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="bg-gradient-to-b from-white to-purple-50">
        <div className="container py-16 overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">What Our Patients Say</h2>
          </div>
          <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
            />
            <InfiniteMovingCards
              items={[...testimonials].reverse()}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Book your appointment today and take the first step towards better health</p>
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:1234567890"
                className="flex items-center text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRoleSelect={handleRoleSelect}
        onPhoneSubmit={handlePhoneSubmit}
        step={registerStep}
        onStepChange={setRegisterStep}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div >
  );
}
