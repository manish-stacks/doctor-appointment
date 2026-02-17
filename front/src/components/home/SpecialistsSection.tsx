import { useEffect, useState } from 'react';
import { AxiosInstance } from '@/helpers/Axios.instance';
import * as Icons from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
interface Category {
  id: number;
  name: string;
  image: string;
  icon: string;
  doctorCount: number;
  slug: string;
}


export default function SpecialistsSection({ isDarkMode = false }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSpecialty, setActiveSpecialty] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await AxiosInstance.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <section className={`py-18 px-4 sm:px-6 lg:px-8 transition-colors bg-grid-pattern duration-700 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
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

          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Expert Healthcare Across Specialties
          </h2>

          <p className={`text-md max-w-3xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Connect with board-certified specialists and receive personalized care from the comfort of your home.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories.map((category, index) => {
            const Icon = Icons[category.icon as keyof typeof Icons] || Icons.Heart;
            const isActive = activeSpecialty === index;

            return (
              <Link
                href={`/our-experts?category=${category.slug}`}
                key={category.id}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl 
                  ${isDarkMode
                    ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-slate-200/50'
                  }`}
                onMouseEnter={() => setActiveSpecialty(index)}
                onMouseLeave={() => setActiveSpecialty(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
               
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-white to-slate-50'} rounded-2xl`}></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 mb-4 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${isDarkMode
                      ? 'bg-slate-800 group-hover:bg-slate-700'
                      : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}>
                      <Icon className={`w-7 h-7 transition-colors duration-300 ${isDarkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-600 group-hover:text-blue-600'
                        }`} />
                    </div>

                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Specialized care and treatment
                    </p>

                    {/* Doctor count */}
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {category.doctorCount} Doctors
                      </span>
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                        : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                        }`}>

                      </div>
                    </div>

                  </div>
               
              </Link>
            );
          })}

        </div>
      </div>
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(#2222221a 1px, #0000 1px), linear-gradient(90deg, #2222221a 1px, #0000 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}
