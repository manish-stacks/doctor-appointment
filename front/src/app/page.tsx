'use client';

import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import MobileAppSection from "@/components/home/MobileAppSection";
import { PricingSection } from "@/components/home/PricingSection";
import { SearchDoctorSection } from "@/components/home/SearchDoctorSection";
import  SpecialistsSection  from "@/components/home/SpecialistsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { useUIStore } from "@/store/uiStore";

export default function Home() {

  const {
      isDarkMode,
      openLoginModal,
    } = useUIStore();
  

  return (
    <>
      <HeroSection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
      <StatsSection isDarkMode={isDarkMode} />
      <HowItWorksSection isDarkMode={isDarkMode} />
      <FeaturesSection isDarkMode={isDarkMode} />
      <SpecialistsSection isDarkMode={isDarkMode} />
      <SearchDoctorSection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
      <PricingSection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
      <TestimonialsSection isDarkMode={isDarkMode} />
      <FAQSection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
      <MobileAppSection isDarkMode={isDarkMode} />
      <CTASection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
      
    </>
  );
}