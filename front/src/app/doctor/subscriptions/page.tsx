'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/Breadcrumb';
import { AxiosInstance } from '@/helpers/Axios.instance';

type Plan = {
  id: number;
  name: string;
  totalAppointment: number;
  validity: string;
  price: string;
  isCurrent?: boolean;
};

export default function SubscriptionPanel() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubId, setCurrentSubId] = useState<number | null>(null);

  const fetchPlans = async () => {
    try {
      const allPlans = await AxiosInstance.get('/subscription');
      const userSub = await AxiosInstance.get('/subscription/userbuy') as { subscriptionId: number };
      console.log(userSub);

      const activeSubId = userSub?.subscriptionId || null;

      const updatedPlans = allPlans?.map((plan: Plan) => ({
        ...plan,
        isCurrent: plan.id === activeSubId,
      }));

      setPlans(updatedPlans);
      setCurrentSubId(activeSubId);
    } catch (error) {
      console.error("Failed to fetch subscription data:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <Breadcrumb title="Your Subscription Plan" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative group rounded-2xl p-6 shadow-xl border-2 ${plan.isCurrent
              ? 'bg-indigo-100 border-indigo-500'
              : 'bg-white border-transparent hover:border-indigo-300 hover:shadow-2xl'
              } transition-all duration-300`}
          >
            {plan.isCurrent && (
              <div className="absolute top-0 right-0 m-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                Current Plan
              </div>
            )}
            <h3 className="text-xl font-semibold text-indigo-800">{plan.name}</h3>
            <p className="text-gray-500 mt-1">{plan.totalAppointment} Appointments</p>
            <div className="mt-4">
              <p className="text-2xl font-bold text-black">{plan.price == '0' ? 'Free' : '₹' + plan.price}</p>
              <p className="text-sm text-gray-500">{plan.validity} Month </p>
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
}
