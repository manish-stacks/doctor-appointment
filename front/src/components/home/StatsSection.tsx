import { Award, Heart, Star, Users } from 'lucide-react';
import React from 'react';

interface StatsSectionProps {
  isDarkMode: boolean;
}

const stats = [
  { number: '50K+', label: 'Happy Patients', icon: Users },
  { number: '500+', label: 'Expert Doctors', icon: Award },
  { number: '50+', label: 'Specialties', icon: Heart },
  { number: '4.9/5', label: 'Patient Rating', icon: Star },
];

export function StatsSection({ isDarkMode }: StatsSectionProps) {



  return (
    <section className="relative -mt-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Card */}
        <div className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white border-gray-200'}  rounded-2xl shadow-2xl overflow-hidden`}>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-12  relative">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-700 font-medium leading-tight">
                  {stat.label}
                </div>
                {/* Divider (except last item) */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-px h-16 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      {/* <div className="mt-20 bg-gradient-to-b from-[#2d3e5f] to-[#1e2940] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">
            Diagnostic plans
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0ea5e9] mb-4">
            Our special offers
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus purus, pharetra quis tempus id,
          </p>
        </div>
      </div> */}
    </section>
  );
}