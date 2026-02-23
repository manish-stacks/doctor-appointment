'use client';

import { useState } from 'react';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Smart Scheduling',
    description: 'AI-powered appointment booking that finds the perfect time slot for you',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '24/7 Telemedicine',
    description: 'Connect with doctors instantly through video consultations anytime',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Expert Network',
    description: 'Access to 500+ certified specialists across 50+ medical fields',
    gradient: 'from-rose-500 to-orange-500',
    bgGradient: 'from-rose-50 to-orange-50',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'HIPAA Compliant',
    description: 'Bank-level security with end-to-end encryption for your privacy',
    gradient: 'from-pink-600 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50',
  },
];

export function FeaturesSection({ isDarkMode }: { isDarkMode: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`relative py-20 overflow-hidden bg-gray-50 ${isDarkMode ? 'dark:bg-gray-50' : ''}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full filter blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
         

          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: '#1e293b',
              letterSpacing: '-0.02em',
            }}
          >
            Why Choose <span style={{
              background: 'linear-gradient(135deg, #1a2e4a, #0f3460)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>MediCare+</span>?
          </h2>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: '#64748b', lineHeight: 1.7 }}
          >
            Experience the future of healthcare with our comprehensive platform designed for modern patients and healthcare providers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
              style={{
                transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                className="relative h-full rounded-2xl overflow-hidden"
                style={{
                  background: 'white',
                  boxShadow: hoveredIndex === index
                    ? '0 20px 40px rgba(244, 114, 182, 0.2)'
                    : '0 4px 12px rgba(0, 0, 0, 0.06)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* Gradient top border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                <div className="p-6 lg:p-8">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgGradient}`}
                      style={{
                        transform: hoveredIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <div
                        className={`bg-gradient-to-br ${feature.gradient}`}
                        style={{
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      color: '#1e293b',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="leading-relaxed"
                    style={{
                      color: '#64748b',
                      fontSize: '15px',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div
                    className="mt-6 flex items-center gap-2 font-semibold text-sm"
                    style={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-10px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span className={`bg-gradient-to-r ${feature.gradient}`} style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Learn more
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${feature.bgGradient} rounded-tl-full`}
                  style={{
                    opacity: hoveredIndex === index ? 0.5 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}