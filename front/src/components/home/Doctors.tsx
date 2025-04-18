import React from 'react'
import { motion } from 'framer-motion';
import { doctors } from '@/constant/home-page';
import { Star, Users } from 'lucide-react';

export const Doctors = () => {
    return (
        <>
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
        </>
    )
}
