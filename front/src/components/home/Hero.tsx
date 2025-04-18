import React from 'react'
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <>
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
        </>
    )
}
