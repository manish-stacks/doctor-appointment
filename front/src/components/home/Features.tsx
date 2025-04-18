import React from 'react'
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';

export const Features = () => {
    return (
        <>
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
        </>
    )
}
