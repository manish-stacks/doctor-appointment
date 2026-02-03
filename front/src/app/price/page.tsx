"use client";
import { PricingSection } from '@/components/home/PricingSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { useUIStore } from '@/store/uiStore';
import React from 'react'

const Price = () => {
    const { isDarkMode, openLoginModal } = useUIStore();
    return (
        <>
            <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 100%)", height: 56 }}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                    <span className="text-white font-bold text-lg" style={{ letterSpacing: "-0.3px" }}>
                        Pricing
                    </span>
                </div>
            </div>
            <PricingSection isDarkMode={isDarkMode} handlePatientLogin={openLoginModal} />
            <TestimonialsSection isDarkMode={isDarkMode} />
        </>
    )
}
export default Price