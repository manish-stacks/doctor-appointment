'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, number } from 'framer-motion';
import Breadcrumb from '@/components/ui/custom/breadcrumb';
import { AxiosInstance } from '@/helpers/Axios.instance';
import { PlanFeatures } from '@/components/home/PricingSection';
import { loadRazorpay } from '@/helpers/Helper';
import toast from 'react-hot-toast';

type Plan = {
  id: number;
  name: string;
  price: number;
  features: string[];
  noAddonFeatures: string[];
  isCurrent: boolean;
  totalAppointment: number;
  validity: number;
  description: string;
  period: string;
  buttonText: string;
  gradient: string;
  buttonStyle: string;
  popular: number;
  priceText: string;
};

export default function SubscriptionPanel() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const parseFeatures = (value?: string | string[]): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  };

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const [plansRes, userSubRes] = await Promise.all([
        AxiosInstance.get<Plan[]>('/subscription'),
        AxiosInstance.get<{ subscriptionId: number | null }>('/subscription/userBuy'),
      ]);

      const activeSubId = userSubRes.data?.subscriptionId ?? null;

      const updatedPlans: Plan[] = plansRes.data.map((plan) => ({
        ...plan,
        name: plan.name.trim(),
        isCurrent: plan.id === activeSubId,
        features: parseFeatures(plan.features),
        noAddonFeatures: parseFeatures(plan.noAddonFeatures),
      }));

      setPlans(updatedPlans);
    } catch (error) {
      console.error('Failed to fetch subscription data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSubscribe = async (planId: number, amount: number): Promise<void> => {
    try {
      await completeSubscribe(planId, amount);
      // await AxiosInstance.post('/subscription/buy', {
      //   subscriptionId: planId,
      // });
      // await fetchPlans();
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const completeSubscribe = async (subscriptionId: number, amount: number) => {

    const { data } = await AxiosInstance.post("/payment/razorpay/subscription/create", {
      subscriptionId: Number(subscriptionId),
      amount,
    });

    const res = await loadRazorpay();

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: process.env.APP_NAME || "Doctor Appointment",
      order_id: data.razorpayOrderId,
      theme: {
        color: "#2563eb",
      },
      handler: async function (response: any) {
        await AxiosInstance.post("/payment/razorpay/subscription/verify", response);
        toast.success("Payment successful");
      },

    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response: any) {
      toast.error("Payment failed");
    });
  };

  return (
    <div className="p-6 min-h-screen">
      <Breadcrumb title="Your Subscription Plan" />

      {loading && (
        <p className="mt-6 text-center text-gray-500">Loading plans...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className={`relative rounded-xl border bg-white p-6
    ${plan.isCurrent
                ? 'border-indigo-500 ring-1 ring-indigo-100'
                : 'border-gray-200 hover:border-indigo-300'
              } transition`}
          >
            {plan.isCurrent && (
              <span className="absolute top-4 right-4 text-xs font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                Active Plan
              </span>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {plan.totalAppointment} Appointments
              </p>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-semibold text-gray-900">
                {plan.price === 0 ? 'Free' : `₹${plan.price}`}
              </p>
              <p className="text-sm text-gray-500">
                Valid for {plan.validity} month
              </p>
            </div>

            <div className="border-t pt-4">
              <PlanFeatures plan={plan} isDarkMode={false} />
            </div>

            {!plan.isCurrent && (
              <button
                onClick={() => handleSubscribe(plan.id, plan.price)}
                className="mt-6 w-full rounded-lg border border-indigo-600
        bg-indigo-600 text-white py-2.5 text-sm font-medium
        hover:bg-indigo-700 focus:outline-none focus:ring-2
        focus:ring-indigo-500 focus:ring-offset-2 transition"
              >
                Upgrade Plan
              </button>
            )}

            {plan.isCurrent && (
              <button
                disabled
                className="mt-6 w-full rounded-lg bg-gray-100 text-gray-500 py-2.5 text-sm font-medium cursor-not-allowed"
              >
                Current Plan
              </button>
            )}
          </motion.div>

        ))}
      </div>
    </div>
  );
}
