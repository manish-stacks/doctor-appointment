'use client';
import Image from 'next/image';

const stats = [
  {
    number: '50K+',
    label: 'Happy Patients',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: '500+',
    label: 'Expert Doctors',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    number: '50+',
    label: 'Specialties',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    number: '4.9/5',
    label: 'Patient Rating',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function HeroSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src="/img/heroBanner.png"
            alt="Doctor providing healthcare"
            className="w-full h-full object-cover"
            priority
          />
          {/* Pink/Rose Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e4a]/90 via-[#0f3460]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Maximum Care For<br />
              Patient Health Issues<br />
              and Wellbeing
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed">
              At MediCare, we are dedicated to delivering exceptional healthcare
              <br className="hidden sm:block" />
              with compassion, innovation, and integrity.
            </p>

            {/* CTA Button */}
            <button
              className="group inline-flex items-center gap-3 bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{
                transition: 'all 0.3s ease',
              }}
            >
              Get Our Service
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-white transition-transform group-hover:translate-x-1"
                style={{
                  background: 'linear-gradient(135deg, #0f3460, #1a2e4a)',
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Card */}
          <div
            className="rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm"
            style={{
              background: isDarkMode
                ? 'rgba(31, 41, 55, 0.9)'
                : 'rgba(255, 255, 255, 0.95)',
              border: isDarkMode ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(229, 231, 235, 0.5)',
            }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-12 py-10 md:py-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                  style={{
                    position: 'relative',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #3d89e4, #133a69)',
                    }}
                  >
                    <div className="text-white ">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Number */}
                  <div
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 transition-colors duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #0f3460, #2f6eba)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div
                    className="text-sm md:text-base font-medium leading-tight"
                    style={{
                      color: isDarkMode ? '#d1d5db' : '#475569',
                    }}
                  >
                    {stat.label}
                  </div>

                  {/* Vertical Divider (Desktop only, not on last item) */}
                  {index < stats.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-1/2 right-0 w-px h-20 transform -translate-y-1/2"
                      style={{
                        background: isDarkMode
                          ? 'linear-gradient(to bottom, transparent, rgba(75, 85, 99, 0.5), transparent)'
                          : 'linear-gradient(to bottom, transparent, rgba(203, 213, 225, 0.8), transparent)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Accent Line */}
            <div
              className="h-1"
              style={{
                background: 'linear-gradient(90deg, #484bec, #583ff4, #3c4ffb, #8964c5, #06164e)',
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 3s ease infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}