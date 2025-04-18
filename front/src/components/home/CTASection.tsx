import React from 'react'
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

function CTASection() {
    return (
        <>
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
        </>
    )
}

export default CTASection