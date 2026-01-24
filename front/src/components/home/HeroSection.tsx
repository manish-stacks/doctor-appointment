'use client';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="">
      {/* <TopInfoBar />
      <Header /> */}
      <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src="/img/heroBanner.png"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-800/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Maximum Care For<br />
              Patient Health Issues<br />
              and Wellbeing
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed">
              At MediCare, we are dedicated to delivering exceptional healthcare<br className="hidden sm:block" />
              with compassion, innovation, and integrity.
            </p>
            <button className="group flex items-center gap-3 bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Our Service
              <span className="flex items-center justify-center w-8 h-8 bg-[#0ea5e9] rounded-full text-white group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>

       
      </section>
    </div>
  );
}