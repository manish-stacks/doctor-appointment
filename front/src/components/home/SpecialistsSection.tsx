import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Heart, Stethoscope, Baby, Bone, Brain, UserCheck, Eye, Ear, Pill, Shield, Activity } from 'lucide-react';

interface SpecialistsSectionProps {
  isDarkMode: boolean;
}

const specialties = [
  { name: 'Cardiology', Icon: Heart, doctors: '45+', accent: 'rose' },
  { name: 'Dermatology', Icon: Shield, doctors: '32+', accent: 'pink' },
  { name: 'Pediatrics', Icon: Baby, doctors: '38+', accent: 'blue' },
  { name: 'Orthopedics', Icon: Bone, doctors: '28+', accent: 'orange' },
  { name: 'Neurology', Icon: Brain, doctors: '22+', accent: 'purple' },
  { name: 'Gynecology', Icon: UserCheck, doctors: '35+', accent: 'emerald' },
  { name: 'Psychiatry', Icon: Brain, doctors: '26+', accent: 'indigo' },
  { name: 'Ophthalmology', Icon: Eye, doctors: '24+', accent: 'teal' },
  { name: 'ENT', Icon: Ear, doctors: '20+', accent: 'amber' },
  { name: 'Pharmacy', Icon: Pill, doctors: '42+', accent: 'cyan' },
  { name: 'General Medicine', Icon: Stethoscope, doctors: '55+', accent: 'violet' },
  { name: 'Emergency', Icon: Activity, doctors: '24/7', accent: 'red' },
];

export default function SpecialistsSection({ isDarkMode = false }: SpecialistsSectionProps) {
  const [activeSpecialty, setActiveSpecialty] = useState<number | null>(null);

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500"></div>
            <Badge variant="secondary" className={`px-4 py-1 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'} border-0`}>
              Medical Specialties
            </Badge>
            <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Expert Healthcare Across
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              All Specializations
            </span>
          </h2>
          
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Connect with board-certified specialists and receive personalized care from the comfort of your home.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {specialties.map((specialty, index) => {
            const { Icon } = specialty;
            const isActive = activeSpecialty === index;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl 
                  ${
                  isDarkMode 
                    ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600' 
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-slate-200/50'
                }`}
                onMouseEnter={() => setActiveSpecialty(index)}
                onMouseLeave={() => setActiveSpecialty(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background pattern */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-white to-slate-50'} rounded-2xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 mb-4 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDarkMode 
                      ? 'bg-slate-800 group-hover:bg-slate-700' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-600 group-hover:text-blue-600'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {specialty.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Specialized care and treatment
                  </p>
                  
                  {/* Doctor count */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {specialty.doctors} Doctors
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                        : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                    }`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`relative rounded-3xl p-8 md:p-12 ${isDarkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  500+
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                  Medical Experts
                </p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  50+
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                  Specializations
                </p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  24/7
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                  Emergency Care
                </p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  98%
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                  Patient Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}