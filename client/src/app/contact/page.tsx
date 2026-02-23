"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Validation ──
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{7,15}$/.test(formData.phone.replace(/\D/g, ""))) e.phone = "Invalid phone";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1800);
  };

  // ── Reusable input style ──
  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 18px",
    fontSize: 14,
    border: `2px solid ${errors[field] ? "#ef4444" : "#cbd5e1"}`,
    borderRadius: 12,
    outline: "none",
    background: "#f8fafc",
    color: "#1e293b",
    transition: "border 0.2s, box-shadow 0.2s",
  });

  const onFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
    e.target.style.background = "#fff";
  };
  const onBlur = (e, field) => {
    e.target.style.borderColor = errors[field] ? "#ef4444" : "#cbd5e1";
    e.target.style.boxShadow = "none";
    e.target.style.background = "#f8fafc";
  };

  // ── Info cards data ──
  const infoCards = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Our Address",
      lines: ["1234 Health Street, Suite 100", "New York, NY 10001", "United States"],
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      title: "Phone Number",
      lines: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Mon – Fri: 9AM – 6PM"],
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Email Address",
      lines: ["contact@healthcare.com", "support@healthcare.com", "info@healthcare.com"],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>

    

      {/* ── Hero Banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 240, background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 50%, #0f3460 100%)" }}
      >
        {/* decorative blobs */}
        <div className="absolute rounded-full opacity-10" style={{ width: 300, height: 300, background: "#3b82f6", top: -90, right: -60 }} />
        <div className="absolute rounded-full opacity-8" style={{ width: 180, height: 180, background: "#60a5fa", bottom: -70, left: 200 }} />
        <div className="absolute rounded-full opacity-5" style={{ width: 120, height: 120, background: "#fff", top: 50, left: 80 }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#60a5fa" }}>
            Contact Us
          </p>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ letterSpacing: "-0.5px" }}>
            Get In <span style={{ color: "#93c5fd" }}>Touch</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 500 }}>
            Have a question or need assistance? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </div>

      {/* ── Info Cards Row ── */}
      <div className="max-w-6xl mx-auto px-6" style={{ marginTop: -42, position: "relative", zIndex: 10 }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{
                  width: 64,
                  height: 64,
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  color: "#2563eb",
                }}
              >
                {card.icon}
              </div>
              <h3 className="font-bold mb-2" style={{ fontSize: 16, color: "#1e3a5f" }}>
                {card.title}
              </h3>
              {card.lines.map((line, j) => (
                <p key={j} style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7 }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact Form ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left decorative panel */}
            <div
              className="relative overflow-hidden lg:col-span-2"
              style={{
                background: "linear-gradient(160deg, #1e3a5f 0%, #1a2e4a 60%, #0f3460 100%)",
                minHeight: 520,
              }}
            >
              {/* blobs */}
              <div className="absolute rounded-full opacity-10" style={{ width: 220, height: 220, background: "#3b82f6", top: -60, left: -60 }} />
              <div className="absolute rounded-full opacity-10" style={{ width: 160, height: 160, background: "#60a5fa", bottom: 40, right: -40 }} />
              <div className="absolute rounded-full opacity-5" style={{ width: 90, height: 90, background: "#fff", top: 180, right: 60 }} />

              <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                <h2 className="text-white font-bold mb-3" style={{ fontSize: 24, letterSpacing: "-0.3px" }}>
                  Send Us a<br /><span style={{ color: "#93c5fd" }}>Message</span>
                </h2>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                {/* small feature bullets */}
                <div className="mt-8 flex flex-col gap-4">
                  {["24/7 Support Available", "Expert Medical Team", "Quick Response Time"].map((txt, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{ width: 34, height: 34, background: "rgba(96,165,250,0.2)" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span style={{ fontSize: 14, color: "#cbd5e1" }}>{txt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: actual form */}
            <div className="lg:col-span-3 p-8">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 400 }}>
                  <div
                    className="flex items-center justify-center rounded-full mb-5"
                    style={{ width: 90, height: 90, background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#1e3a5f" }}>Message Sent!</h3>
                  <p style={{ fontSize: 14, color: "#64748b", maxWidth: 340 }}>
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-semibold text-white px-8 py-3 rounded-xl transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", fontSize: 14 }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.4)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-bold mb-1" style={{ fontSize: 22, color: "#1e3a5f" }}>
                    Contact Form
                  </h2>
                  <p style={{ fontSize: 13.5, color: "#94a3b8", marginBottom: 28 }}>
                    All fields marked with <span style={{ color: "#ef4444" }}>*</span> are required
                  </p>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 7 }}>
                        Full Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, "name")}
                        placeholder="John Doe"
                        style={inputStyle("name")}
                      />
                      {errors.name && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 7 }}>
                        Email Address <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, "email")}
                        placeholder="john@example.com"
                        style={inputStyle("email")}
                      />
                      {errors.email && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 7 }}>
                        Phone Number <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, "phone")}
                        placeholder="+1 (555) 000-0000"
                        style={inputStyle("phone")}
                      />
                      {errors.phone && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 7 }}>
                        Subject <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, "subject")}
                        placeholder="How can we help?"
                        style={inputStyle("subject")}
                      />
                      {errors.subject && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 7 }}>
                      Your Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={onFocus}
                      onBlur={(e) => onBlur(e, "message")}
                      placeholder="Write your message here..."
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }}
                    />
                    {errors.message && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    style={{
                      padding: "15px 0",
                      fontSize: 15,
                      background: submitting
                        ? "#93c5fd"
                        : "linear-gradient(135deg, #3b82f6, #2563eb)",
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,246,0.45)"; }}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAP SECTION ── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {/* Map Header Bar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ background: "linear-gradient(135deg, #1e3a5f, #1a2e4a)" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "rgba(96,165,250,0.2)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold" style={{ fontSize: 15 }}>Find Us On Map</h3>
                <p style={{ fontSize: 12, color: "#94a3b8" }}>1234 Health Street, New York, NY</p>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
              style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(96,165,250,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(96,165,250,0.15)"; }}
            >
              View on Google Maps →
            </a>
          </div>

          {/* SVG Map */}
          <div style={{ width: "100%", height: 420, background: "#e8edf2", position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="parkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bbf7d0" />
                  <stop offset="100%" stopColor="#86efac" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
                <linearGradient id="pinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a5f" floodOpacity="0.25" />
                </filter>
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Base background */}
              <rect width="1200" height="420" fill="#eef2f7" />

              {/* Water body bottom-right */}
              <path d="M900,320 Q950,300 1000,330 Q1060,360 1100,340 Q1150,320 1200,360 L1200,420 L880,420 Z" fill="url(#waterGrad)" opacity="0.7" />
              <text x="1020" y="385" textAnchor="middle" fontSize="11" fill="#0284c7" fontWeight="600" fontFamily="sans-serif">River Bay</text>

              {/* Parks / green areas */}
              <rect x="80" y="60" width="160" height="100" rx="12" fill="url(#parkGrad)" opacity="0.6" />
              <text x="160" y="115" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="600" fontFamily="sans-serif">Central Park</text>

              <rect x="720" y="40" width="120" height="80" rx="10" fill="url(#parkGrad)" opacity="0.5" />
              <text x="780" y="82" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="600" fontFamily="sans-serif">Oak Garden</text>

              <ellipse cx="200" cy="320" rx="70" ry="40" fill="url(#parkGrad)" opacity="0.45" />
              <text x="200" y="324" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="600" fontFamily="sans-serif">Green Lot</text>

              {/* Major horizontal roads */}
              <rect x="0" y="155" width="1200" height="18" fill="#cbd5e1" rx="0" />
              <rect x="0" y="160" width="1200" height="8" fill="#fff" opacity="0.4" />
              <text x="30" y="152" fontSize="9.5" fill="#64748b" fontWeight="600" fontFamily="sans-serif">BROADWAY</text>

              <rect x="0" y="265" width="1200" height="14" fill="#cbd5e1" />
              <rect x="0" y="269" width="1200" height="6" fill="#fff" opacity="0.35" />
              <text x="30" y="262" fontSize="9" fill="#64748b" fontWeight="600" fontFamily="sans-serif">5TH AVENUE</text>

              {/* Major vertical roads */}
              <rect x="280" y="0" width="16" height="420" fill="#cbd5e1" />
              <rect x="284" y="0" width="8" height="420" fill="#fff" opacity="0.35" />

              <rect x="530" y="0" width="14" height="420" fill="#cbd5e1" />
              <rect x="533" y="0" width="7" height="420" fill="#fff" opacity="0.3" />

              <rect x="780" y="0" width="12" height="420" fill="#cbd5e1" />

              {/* Minor streets */}
              <rect x="0" y="210" width="1200" height="6" fill="#dde3ea" />
              <rect x="0" y="240" width="1200" height="5" fill="#dde3ea" />
              <rect x="0" y="310" width="880" height="5" fill="#dde3ea" />
              <rect x="0" y="350" width="880" height="5" fill="#dde3ea" />
              <rect x="0" y="90" width="1200" height="5" fill="#dde3ea" />
              <rect x="0" y="120" width="1200" height="5" fill="#dde3ea" />
              <rect x="100" y="0" width="5" height="420" fill="#dde3ea" />
              <rect x="420" y="0" width="5" height="420" fill="#dde3ea" />
              <rect x="650" y="0" width="5" height="420" fill="#dde3ea" />
              <rect x="920" y="0" width="5" height="420" fill="#dde3ea" />
              <rect x="1050" y="0" width="5" height="420" fill="#dde3ea" />

              {/* Street labels */}
              <text x="100" y="88" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif">1ST ST</text>
              <text x="420" y="88" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif">3RD ST</text>
              <text x="650" y="88" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif">4TH ST</text>
              <text x="920" y="88" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif">6TH ST</text>
              <text x="278" y="10" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif" transform="rotate(90,288,10)">MADISON AVE</text>
              <text x="528" y="10" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif" transform="rotate(90,537,10)">PARK AVE</text>
              <text x="778" y="10" fontSize="8.5" fill="#94a3b8" fontFamily="sans-serif" transform="rotate(90,784,10)">LEXINGTON</text>

              {/* Building blocks (grey rectangles) */}
              <rect x="30" y="168" width="58" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="110" y="168" width="80" height="37" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="300" y="168" width="70" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="390" y="168" width="55" height="37" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="460" y="168" width="60" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="550" y="168" width="75" height="37" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="640" y="168" width="55" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="800" y="168" width="90" height="37" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="910" y="168" width="65" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="1000" y="168" width="80" height="37" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="1100" y="168" width="70" height="37" rx="4" fill="#d1d5db" filter="url(#softShadow)" />

              <rect x="30" y="220" width="65" height="35" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="120" y="220" width="50" height="35" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="300" y="220" width="55" height="35" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="550" y="220" width="70" height="35" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="800" y="220" width="60" height="35" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="920" y="220" width="75" height="35" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="1060" y="220" width="55" height="35" rx="4" fill="#d1d5db" filter="url(#softShadow)" />

              <rect x="30" y="275" width="70" height="28" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="120" y="275" width="55" height="28" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="300" y="275" width="65" height="28" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="550" y="275" width="60" height="28" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="800" y="275" width="70" height="28" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="920" y="275" width="55" height="28" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />

              <rect x="30" y="320" width="60" height="25" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="120" y="360" width="65" height="25" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="300" y="320" width="55" height="25" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="300" y="360" width="70" height="25" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="550" y="320" width="65" height="25" rx="4" fill="#d1d5db" filter="url(#softShadow)" />
              <rect x="550" y="360" width="55" height="25" rx="4" fill="#c4c9d1" filter="url(#softShadow)" />
              <rect x="920" y="320" width="60" height="25" rx="4" fill="#d1d5db" filter="url(#softShadow)" />

              {/* ── OUR LOCATION MARKER ── */}
              {/* Pulse ring */}
              <circle cx="490" cy="230" r="28" fill="#3b82f6" opacity="0.15">
                <animate attributeName="r" values="18;32;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="490" cy="230" r="22" fill="#3b82f6" opacity="0.1">
                <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" style={{ animationDelay: "0.4s" }} />
                <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" style={{ animationDelay: "0.4s" }} />
              </circle>

              {/* Pin shadow */}
              <ellipse cx="490" cy="248" rx="8" ry="3" fill="#1e3a5f" opacity="0.2" />

              {/* Pin body */}
              <path d="M490,218 L484,236 Q490,242 496,236 Z" fill="url(#pinGrad)" filter="url(#shadow)" />
              <circle cx="490" cy="224" r="5.5" fill="#fff" />
              <circle cx="490" cy="224" r="2.5" fill="#2563eb" />

              {/* Label box */}
              <rect x="430" y="192" width="120" height="22" rx="6" fill="#1e3a5f" filter="url(#shadow)" />
              <text x="490" y="207" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="700" fontFamily="sans-serif">🏥 Our Clinic</text>

              {/* ── Other location markers (small) ── */}
              <circle cx="350" cy="185" r="5" fill="#60a5fa" opacity="0.8" />
              <circle cx="350" cy="185" r="2.5" fill="#fff" />
              <text x="365" y="183" fontSize="8" fill="#1e3a5f" fontWeight="600" fontFamily="sans-serif">Hospital</text>

              <circle cx="700" cy="240" r="4.5" fill="#60a5fa" opacity="0.7" />
              <circle cx="700" cy="240" r="2" fill="#fff" />
              <text x="710" y="238" fontSize="7.5" fill="#1e3a5f" fontWeight="600" fontFamily="sans-serif">Pharmacy</text>

              <circle cx="850" cy="185" r="4" fill="#60a5fa" opacity="0.6" />
              <circle cx="850" cy="185" r="1.8" fill="#fff" />
              <text x="860" y="183" fontSize="7.5" fill="#1e3a5f" fontWeight="600" fontFamily="sans-serif">Lab</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}