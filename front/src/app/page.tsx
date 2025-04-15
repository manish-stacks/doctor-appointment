"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Star, Users, CheckCircle2 } from 'lucide-react';
import { InfiniteMovingCards } from '@/components/home/InfiniteMovingCards';
import { doctors, plans, testimonials } from '@/constant/home-page';
import { AuthModal } from '@/components/AuthModal';
import { useRouter } from 'next/navigation';

export default function Home() {

  const navigate = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<'role' | 'phone'>('role');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');

  const handleRoleSelect = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    setAuthStep('phone');
  };

  const handlePhoneSubmit = (phone: string) => {
    setIsAuthModalOpen(false);
    // In a real app, you'd handle authentication here
    // For demo, we'll just navigate to the dashboard
    navigate.push(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecf9fc] to-[#f3fdff]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-900">MediCare</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate.push('/login')}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Login
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">Your Health, Our Priority</h1>
          <p className="text-xl text-gray-600 mb-8">Book appointments with top-rated doctors in your area</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Book Appointment
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}


      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Calendar className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Book appointments instantly with our intuitive scheduling system</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Access to a network of qualified healthcare professionals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Clock className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for all your healthcare needs</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-900">Our Doctors</h2>
          <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
            View All Doctors
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{doctor.name}</h3>
                <p className="text-blue-500 text-sm text-center mb-3">{doctor.specialty}</p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-cyan-500 font-medium">Medicare Package</span>
          <h2 className="text-3xl font-bold text-indigo-900 mt-2">Pricing Plan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${plan.featured ? 'ring-2 ring-cyan-500' : ''}`}
            >
              <div className={`p-14 ${plan.featured ? 'bg-cyan-500 text-white' : ''}`}>
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.discountedPrice && (
                    <span className="ml-2 text-sm line-through">NOW ${plan.discountedPrice}</span>
                  )}
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className={`w-5 h-5 mr-2 ${typeof feature === 'string' ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={typeof feature === 'string' ? 'text-gray-700' : 'text-gray-400'}>
                        {typeof feature === 'string' ? feature : feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3 rounded-full font-medium
                  ${plan.featured
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} 
                  transition-colors`}>
                  Select Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 overflow-hidden">
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRoleSelect={handleRoleSelect}
        onPhoneSubmit={handlePhoneSubmit}
        step={authStep}
        onStepChange={setAuthStep}
      />

    </div>
  );
}
