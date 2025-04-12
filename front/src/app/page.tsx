"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Star, Users, CheckCircle2 } from 'lucide-react';
import MeteorEffect from './MeteorEffect';

interface infinite {
  items: {
    image: string;
    name: string;
    role: string;
    text: string;
  }[];
  direction: string;
  speed: string;
}
function InfiniteMovingCards({ items, direction = "left", speed = "fast" }: infinite) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = React.useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  const speedValue = {
    fast: 20,
    normal: 40,
    slow: 60,
  }[speed] ?? 40;

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full gap-4 py-4 w-max ${start ? "animate-scroll" : ""
          }`}
        style={{
          "--duration": `${speedValue}s`,
          "--direction": direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties}
      >
        {items.map((testimonial, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-white"
            style={{
              background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
          >
            <blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">"{testimonial.text}"</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const doctors = [
    {
      name: "Dr. John Smith",
      specialty: "Cardiac Rehabilitation Programs",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.9,
      reviews: 11
    },
    {
      name: "Dr. Maria Garcia",
      specialty: "Gynecological Surgery Procedures",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    },
    {
      name: "Dr. Hiroshi Tanaka",
      specialty: "Child Behavioral Health Services",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    },
    {
      name: "Dr. Anastasia Ivanova",
      specialty: "Neonatal Intensive Care",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.5,
      reviews: 2
    },
    {
      name: "Dr. Chen Wei",
      specialty: "Pediatric Vaccination Programs",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    },
    {
      name: "Dr. Fatima Khan",
      specialty: "Radiation Therapy Procedures",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    },
    {
      name: "Dr. Kim Min-ji",
      specialty: "Cardiac Electrophysiology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    },
    {
      name: "Dr. Muhammad Ali",
      specialty: "Asthma Management Services",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 0,
      reviews: 0
    }
  ];

  const plans = [
    {
      name: "Basic Package",
      price: 500,
      discountedPrice: 400,
      features: [
        "Brain-Head",
        "Report & Scan",
        "Consultation Included",
        { disabled: true, text: "Abdomen" },
        { disabled: true, text: "Heart (cardiac)" },
        { disabled: true, text: "Spine (whole)" },
        { disabled: true, text: "Pelvis" }
      ]
    },
    {
      name: "Gold Package",
      price: 1700,
      discountedPrice: 1600,
      featured: true,
      features: [
        "Brain-Head",
        "Abdomen",
        "Pelvis",
        "Report & Scan",
        "Heart (cardiac)",
        "Consultation Included",
        { disabled: true, text: "Spine (whole)" }
      ]
    },
    {
      name: "Platinum Package",
      price: 2000,
      features: [
        "Brain-Head",
        "Abdomen",
        "Pelvis",
        "Spine (whole)",
        "Heart (cardiac)",
        "Consultation Included",
        "Report & Scan"
      ]
    }
  ];

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1504814532849-cff240bbc503?auto=format&fit=crop&q=80&w=300&h=300",
      name: "Sarah Thompson",
      role: "Patient",
      text: "The care and attention I received was exceptional. The doctors were thorough and took the time to explain everything."
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
      name: "Michael Rodriguez",
      role: "Patient",
      text: "Booking appointments was a breeze, and the follow-up care was outstanding. Highly recommend their services!"
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300&h=300",
      name: "Emily Chen",
      role: "Patient",
      text: "The medical team here is amazing. They made me feel comfortable and well-cared for throughout my treatment."
    },
    {
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300&h=300",
      name: "David Wilson",
      role: "Patient",
      text: "Professional, punctual, and caring. The entire staff goes above and beyond to ensure patient satisfaction."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-900">MediCare</div>
            <div className="flex items-center space-x-4">
              <button className="text-indigo-600 hover:text-indigo-800">Login</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">Your Health, Our Priority</h1>
          <p className="text-xl text-gray-600 mb-8">Book appointments with top-rated doctors in your area</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Book Appointment
          </motion.button>
        </motion.div>
      </header>

      {/* Features Section */}


      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <MeteorEffect>
            <motion.div className="bg-rose-600 p-6 rounded-xl shadow-lg">
              <Calendar className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">Book appointments instantly with our intuitive scheduling system</p>
            </motion.div>
          </MeteorEffect> */}


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Calendar className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Book appointments instantly with our intuitive scheduling system</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Access to a network of qualified healthcare professionals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <Clock className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for all your healthcare needs</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-900">Our Doctors</h2>
          <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
            View All Doctors
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{doctor.name}</h3>
                <p className="text-blue-500 text-sm text-center mb-3">{doctor.specialty}</p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-cyan-500 font-medium">Medicare Package</span>
          <h2 className="text-3xl font-bold text-indigo-900 mt-2">Pricing Plan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${plan.featured ? 'ring-2 ring-cyan-500' : ''}`}
            >
              <div className={`p-8 ${plan.featured ? 'bg-cyan-500 text-white' : ''}`}>
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.discountedPrice && (
                    <span className="ml-2 text-sm line-through">NOW ${plan.discountedPrice}</span>
                  )}
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className={`w-5 h-5 mr-2 ${typeof feature === 'string' ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={typeof feature === 'string' ? 'text-gray-700' : 'text-gray-400'}>
                        {typeof feature === 'string' ? feature : feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3 rounded-full font-medium
                  ${plan.featured
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} 
                  transition-colors`}>
                  Select Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-900">What Our Patients Say</h2>
        </div>
        <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
          <InfiniteMovingCards
            items={[...testimonials].reverse()}
            direction="right"
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Book your appointment today and take the first step towards better health</p>
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:1234567890"
                className="flex items-center text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
