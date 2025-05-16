"use client";
import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";

const plans = [
    {
        name: "Free",
        appointments: 500,
        validity: "1 Month",
        price: "Free",
        isCurrent: false,
    },
    {
        name: "Standard",
        appointments: 3000,
        validity: "6 Months",
        price: "₹780",
        isCurrent: false,
    },
    {
        name: "Premium",
        appointments: 10000,
        validity: "12 Months",
        price: "₹1200",
        isCurrent: false,
    },
];

const SubscriptionPanel = () => {
    return (
        <div className="p-6  min-h-screen">
            <Breadcrumb title="Your Subscription Plan" />


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`relative group rounded-2xl p-6 shadow-xl border-2 ${plan.isCurrent
                                ? "bg-indigo-100 border-indigo-500"
                                : "bg-white border-transparent hover:border-indigo-300 hover:shadow-2xl"
                            } transition-all duration-300`}
                    >
                        {plan.isCurrent && (
                            <div className="absolute top-0 right-0 m-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                                Current Plan
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-indigo-800">{plan.name}</h3>
                        <p className="text-gray-500 mt-1">{plan.appointments} Appointments</p>
                        <div className="mt-4">
                            <p className="text-2xl font-bold text-black">{plan.price}</p>
                            <p className="text-sm text-gray-500">{plan.validity} Validity</p>
                        </div>
                        {!plan.isCurrent && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
                            >
                                Upgrade Plan
                            </motion.button>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPanel;
