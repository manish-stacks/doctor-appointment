import React from 'react'
import { motion } from 'framer-motion';
import { Phone, Heart, Globe, Clock } from 'lucide-react';



export const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.8,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <motion.footer
            className={`py-16 transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold">MediCare+</h4>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Making quality healthcare accessible and convenient for everyone. Trusted by thousands of patients and healthcare providers nationwide.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                <span className="text-sm">f</span>
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                <span className="text-sm">t</span>
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                <span className="text-sm">in</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h5 className="text-lg font-semibold mb-6">For Patients</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-white transition-colors cursor-pointer">Find Doctors</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Book Appointments</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Telemedicine</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Health Records</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Prescriptions</li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h5 className="text-lg font-semibold mb-6">For Doctors</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li className="hover:text-white transition-colors cursor-pointer">Join Network</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Manage Schedule</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Patient Portal</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Analytics</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Support</li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h5 className="text-lg font-semibold mb-6">Contact</h5>
                        <div className="space-y-4 text-gray-400">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Globe className="w-4 h-4 flex-shrink-0" />
                                <span>support@medicare-plus.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>24/7 Support Available</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400"
                    variants={itemVariants}
                >
                    <p>&copy; 2024 MediCare+. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                        <span className="hover:text-white transition-colors cursor-pointer">HIPAA Compliance</span>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    )
}
