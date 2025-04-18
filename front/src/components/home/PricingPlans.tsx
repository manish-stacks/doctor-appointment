import React from 'react'
import { plans } from '@/constant/home-page'
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const PricingPlans = () => {
    return (
        <>
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
        </>
    )
}
