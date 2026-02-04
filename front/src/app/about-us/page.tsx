"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    bio: "15+ years of experience in cardiovascular medicine",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Head of Surgery",
    specialty: "General Surgery",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    bio: "Pioneering minimally invasive surgical techniques",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Director of Pediatrics",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    bio: "Specialized in child development and preventive care",
  },
  {
    id: 4,
    name: "Dr. James Williams",
    role: "Chief of Neurology",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    bio: "Expert in neurological disorders and brain health",
  },
];

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Patient-Centered Care",
    description: "We prioritize your health and wellbeing above all else, providing personalized treatment plans.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24/7 Availability",
    description: "Round-the-clock medical support ensures you receive care whenever you need it most.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: "Advanced Technology",
    description: "State-of-the-art medical equipment and cutting-edge treatment methodologies.",
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
    title: "Expert Team",
    description: "Board-certified physicians and healthcare professionals dedicated to excellence.",
  },
];

// Counter component with animation
function Counter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>


      {/* ── Hero Section ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ 
          minHeight: 480,
          background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 40%, #0f3460 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute rounded-full opacity-10" style={{ width: 400, height: 400, background: "#3b82f6", top: -100, right: -80 }} />
        <div className="absolute rounded-full opacity-8" style={{ width: 280, height: 280, background: "#60a5fa", bottom: -120, left: -60 }} />
        <div className="absolute rounded-full opacity-5" style={{ width: 180, height: 180, background: "#fff", top: 120, left: 200 }} />
        <div className="absolute rounded-full opacity-5" style={{ width: 120, height: 120, background: "#fff", top: 60, right: 300 }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#60a5fa" }}>
              About Us
            </p>
            <h1 className="font-bold mb-5" style={{ fontSize: 48, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Dedicated to Your<br />
              <span style={{ color: "#93c5fd" }}>Health & Wellness</span>
            </h1>
            <p className="mb-8" style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.8, maxWidth: 540 }}>
              With over 25 years of excellence in healthcare, we combine cutting-edge technology with compassionate care to deliver the best medical services to our community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", fontSize: 15 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Meet Our Team
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", fontSize: 15 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right: Image Grid */}
          <div className="flex-1 relative" style={{ maxWidth: 500 }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ height: 220, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=300&h=300&fit=crop" alt="Hospital" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ height: 220, marginTop: 40, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=300&fit=crop" alt="Medical" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission & Vision Cards ── */}
      <div className="max-w-7xl mx-auto px-6" style={{ marginTop: -60, position: "relative", zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 64, height: 64, background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h2 className="font-bold" style={{ fontSize: 22, color: "#1e3a5f" }}>Our Mission</h2>
            </div>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>
              To provide accessible, high-quality healthcare services that improve the lives of our patients through compassionate care, innovative treatments, and a commitment to excellence in every interaction.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 64, height: 64, background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="font-bold" style={{ fontSize: 22, color: "#1e3a5f" }}>Our Vision</h2>
            </div>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>
              To be the leading healthcare provider recognized for exceptional patient outcomes, cutting-edge medical technology, and a culture of continuous improvement that sets the standard for excellence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div
            className="px-8 py-12"
            style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 100%)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-bold mb-2" style={{ fontSize: 42, color: "#60a5fa" }}>
                  <Counter end={25} suffix="+" />
                </div>
                <p style={{ fontSize: 14, color: "#cbd5e1" }}>Years Experience</p>
              </div>
              <div className="text-center">
                <div className="font-bold mb-2" style={{ fontSize: 42, color: "#60a5fa" }}>
                  <Counter end={150} suffix="+" />
                </div>
                <p style={{ fontSize: 14, color: "#cbd5e1" }}>Expert Doctors</p>
              </div>
              <div className="text-center">
                <div className="font-bold mb-2" style={{ fontSize: 42, color: "#60a5fa" }}>
                  <Counter end={50000} suffix="+" />
                </div>
                <p style={{ fontSize: 14, color: "#cbd5e1" }}>Happy Patients</p>
              </div>
              <div className="text-center">
                <div className="font-bold mb-2" style={{ fontSize: 42, color: "#60a5fa" }}>
                  <Counter end={99} suffix="%" />
                </div>
                <p style={{ fontSize: 14, color: "#cbd5e1" }}>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Values Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#3b82f6" }}>
            Our Core Values
          </p>
          <h2 className="font-bold" style={{ fontSize: 36, color: "#1e3a5f", letterSpacing: "-0.5px" }}>
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center transition-all duration-300"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,130,246,0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="inline-flex items-center justify-center rounded-full mb-4"
                style={{ width: 72, height: 72, background: "linear-gradient(135deg, #dbeafe, #bfdbfe)", color: "#2563eb" }}
              >
                {value.icon}
              </div>
              <h3 className="font-bold mb-2" style={{ fontSize: 16, color: "#1e3a5f" }}>
                {value.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Our Team Section ── */}
      <div id="team" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#3b82f6" }}>
            Meet Our Experts
          </p>
          <h2 className="font-bold" style={{ fontSize: 36, color: "#1e3a5f", letterSpacing: "-0.5px" }}>
            Our Leadership Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 280 }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Specialty Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", boxShadow: "0 2px 8px rgba(59,130,246,0.4)" }}
                  >
                    {member.specialty}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold mb-1" style={{ fontSize: 17, color: "#1e3a5f" }}>
                  {member.name}
                </h3>
                <p className="mb-3" style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>
                  {member.role}
                </p>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  {["linkedin", "twitter", "mail"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="flex items-center justify-center rounded-full transition-all duration-200"
                      style={{ width: 34, height: 34, border: "2px solid #cbd5e1", color: "#64748b" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#3b82f6";
                        e.currentTarget.style.background = "#eff6ff";
                        e.currentTarget.style.color = "#2563eb";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#cbd5e1";
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#64748b";
                      }}
                    >
                      {social === "linkedin" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      )}
                      {social === "twitter" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {social === "mail" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="relative overflow-hidden rounded-2xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 50%, #0f3460 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute rounded-full opacity-10" style={{ width: 280, height: 280, background: "#3b82f6", top: -80, right: -60 }} />
          <div className="absolute rounded-full opacity-8" style={{ width: 200, height: 200, background: "#60a5fa", bottom: -70, left: -40 }} />

          <div className="relative z-10">
            <h2 className="text-white font-bold mb-3" style={{ fontSize: 32, letterSpacing: "-0.5px" }}>
              Ready to Experience Better Healthcare?
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: "#cbd5e1", maxWidth: 600, margin: "0 auto 2rem" }}>
              Join thousands of satisfied patients who trust us with their health. Schedule your appointment today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", fontSize: 15 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Book Appointment
              </Link>
              <a
                href="#"
                className="px-8 py-4 rounded-xl font-bold transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", fontSize: 15 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}