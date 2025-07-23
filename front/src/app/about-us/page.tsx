import React from 'react';
import { Heart, Shield, Clock, Users, Award, Stethoscope } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '50,000+', label: 'Happy Patients', icon: Users },
    { number: '200+', label: 'Expert Doctors', icon: Stethoscope },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Emergency Care', icon: Clock }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We put our patients first, ensuring personalized treatment plans and compassionate care for every individual.'
    },
    {
      icon: Shield,
      title: 'Safety & Quality',
      description: 'Our facility maintains the highest safety standards with state-of-the-art equipment and certified medical professionals.'
    },
    {
      icon: Clock,
      title: 'Convenient Scheduling',
      description: 'Book appointments easily online, with flexible scheduling options and minimal waiting times.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">HealthCare</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Providing exceptional healthcare services with cutting-edge technology and compassionate care. 
            Your health and well-being are our top priorities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To revolutionize healthcare delivery by making quality medical care accessible, 
                convenient, and patient-focused. We leverage technology to streamline the 
                appointment process while maintaining the human touch that makes healthcare personal.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team of experienced healthcare professionals is dedicated to providing 
                comprehensive medical services in a comfortable, modern environment.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Why Choose Us?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Board-certified specialists
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Advanced diagnostic equipment
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Electronic health records
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Insurance accepted
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Book Your Appointment?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Experience healthcare the way it should be. Schedule your appointment today and 
            join thousands of satisfied patients who trust us with their health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Book Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;