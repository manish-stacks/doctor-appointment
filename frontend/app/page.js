"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stethoscope, ArrowRight, Shield, Clock, ChartBar } from "lucide-react";
import useStore from "@/store/registerStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const features = [
    {
      icon: Clock,
      title: "Efficient Scheduling",
      description:
        "Smart appointment management system that optimizes your daily workflow.",
    },
    {
      icon: Shield,
      title: "Secure Records",
      description:
        "Enterprise-grade security for all your patient data and medical records.",
    },
    {
      icon: ChartBar,
      title: "Advanced Analytics",
      description:
        "Data-driven insights to improve your practice and patient care.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12 md:py-20"
      >
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-block p-3 bg-gray-100 dark:bg-gray-900 rounded-2xl"
            >
              <Stethoscope className="w-8 h-8 text-blue-900 dark:text-white" />
            </motion.div>

            <div className="space-y-4">
              <p className="text-xl font-semibold">Welcome to HBSDocs</p>
              <h1 className="text-4xl md:text-6xl font-bold text-rose-900 dark:text-white">
                Modern Healthcare Management
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                Transform your medical practice with our comprehensive
                management solution.
              </p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group bg-rose-900 hover:bg-rose-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white"
                asChild
              >
                <Link href="/auth/login" className="flex items-center">
                  Get Started
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                asChild
              >
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <div>
              <DotLottieReact
                src="https://assets-v2.lottiefiles.com/a/d495e2f8-1168-11ee-a397-8ffd3cfe20d0/L3a1YTiciv.lottie"
                loop
                autoplay
              />
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-all duration-300"
            >
              <feature.icon className="h-8 w-8 mb-4 text-gray-900 dark:text-white" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
