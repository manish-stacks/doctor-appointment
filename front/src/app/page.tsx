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

  const handlePhoneSubmit = (phone: string) => {
    setIsRegisterModalOpen(false);
    // In a real app, you'd handle authentication here
    // For demo, we'll just navigate to the dashboard
    navigate.push(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation 
        setIsAuthModalOpen={setIsAuthModalOpen} 
        setIsRegisterModalOpen={setIsRegisterModalOpen} 
      />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Doctors Section */}
      <Doctors />

      {/* Pricing Plans */}
      <PricingPlans />


      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
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
      />

    </div>
  );
}
