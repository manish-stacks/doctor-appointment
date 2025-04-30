"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterModal } from '@/components/RegisterModal';
import { AuthModal } from '@/components/AuthModal';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Doctors } from '@/components/home/Doctors';
import { PricingPlans } from '@/components/home/PricingPlans';
import { Testimonials } from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import Navigation from '@/components/Navigation';
import { AxiosInstance } from '@/helpers/Axios.instance';
import toast from 'react-hot-toast';

export default function Home() {

  const navigate = useRouter();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerStep, setRegisterStep] = useState<'role' | 'phone'>('role');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleRoleSelect = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    setRegisterStep('phone');
  };

  const handlePhoneSubmit = async (phone: string) => {
    // setIsRegisterModalOpen(false);
    try {
      const response = await AxiosInstance.post(`/auth/register`, {
        phone,
        role: selectedRole=== 'doctor' ? 'doctor' : 'user',
      });
      console.log(response);
    } catch (error) {
      console.error('Error during phone submission:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';

      toast.error(errorMessage);
      return;
    }

    //navigate.push(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Navigation
        setIsAuthModalOpen={setIsAuthModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
      />
      <Hero />
      <Features />
      <Doctors />
      <PricingPlans />
      <Testimonials />
      <CTASection />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRoleSelect={handleRoleSelect}
        onPhoneSubmit={handlePhoneSubmit}
        step={registerStep}
        onStepChange={setRegisterStep}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        step={registerStep}
        onRoleSelect={handleRoleSelect}
        onStepChange={setRegisterStep}
        selectedRole={selectedRole}
      />

    </div>
  );
}
