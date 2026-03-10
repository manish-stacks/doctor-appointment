"use client";

// import { useState } from "react";

const currentBlog = {
  id: 3,
  category: "Patient Care",
  title: "Navigating the Doctor Patient Relationship Tips for Effective Communication",
  date: "3 years ago",
  views: 320,
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  body: `Another key benefit of regular check-ups is the development of a strong patient-doctor relationship. When individuals visit their doctor regularly, they build trust and feel more comfortable discussing their health concerns. A doctor who is familiar with a patient's medical history can provide more personalized care and make better-informed decisions. This ongoing relationship ensures continuity of care and allows doctors to monitor any changes in health over time.

Building this relationship requires effort from both sides. Patients should come prepared with questions and an honest account of their symptoms, lifestyle, and concerns. Doctors, in turn, should listen actively and communicate findings in a way that is easy to understand. When both parties work together with mutual respect, the outcome is always better.

Regular visits also give doctors the opportunity to track chronic conditions such as diabetes, high blood pressure, or heart disease. Early intervention in these cases can prevent serious complications and reduce the need for emergency treatment. For patients managing long-term conditions, consistent check-ups are not optional — they are essential.

Beyond physical health, a trusted doctor can also be a valuable resource for mental well-being. Many patients find it easier to open up about stress, anxiety, or depression during routine visits when they already have an established rapport. This holistic approach to care — addressing both body and mind — is what separates a good healthcare experience from a truly great one.

In summary, investing time in regular health check-ups is one of the smartest decisions you can make for your future. It is not just about catching illness early — it is about building a partnership with your doctor that supports your health, your confidence, and your peace of mind for years to come.`,
};

const latestBlogs = [
  {
    id: 1,
    title: "The Importance of Regular Health Check-ups",
    date: "3 years ago",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Understanding Common Eye Disorders and Treatments",
    date: "3 years ago",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "The Role of Technology in Modern Healthcare",
    date: "3 years ago",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Healthy Lifestyle Changes That Actually Work",
    date: "3 years ago",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    title: "Managing Stress: Techniques for a Calmer Life",
    date: "5 years ago",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
];

export default function BlogDetailPage() {
  // const [copiedLink, setCopiedLink] = useState(false);

  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   setCopiedLink(true);
  //   setTimeout(() => setCopiedLink(false), 1500);
  // };

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>
      {/* Top Bar */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "160px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute rounded-full opacity-10"
          style={{ width: 320, height: 320, background: "#f472b6", top: -80, left: -60 }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{ width: 200, height: 200, background: "#fb7185", bottom: -60, right: 120 }}
        />
        <div
          className="absolute rounded-full opacity-5"
          style={{ width: 140, height: 140, background: "#ffffff", top: 40, right: 300 }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#3b82f6" }}>
            Our Blog
          </p>


          <div className="flex gap-2" style={{ fontSize: 13, color: "#64748b" }}>
            <a href="#" className="hover:underline" style={{ color: "#3b82f6" }}>Home</a>
            <span>/</span>
            <a href="#" className="hover:underline" style={{ color: "#3b82f6" }}>Blog</a>
            <span>/</span>
            <span className="truncate" style={{ maxWidth: 200, color: "#94a3b8" }}>
              {currentBlog.title}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ letterSpacing: "-0.5px" }}>
            Health Insights & <span style={{ color: "#3b82f6" }}>Medical Knowledge</span>
          </h1>

        </div>
      </div>



     
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-20 pt-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Blog Content ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>

              {/* Hero Image */}
              <div className="w-full overflow-hidden" style={{ height: 380 }}>
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {currentBlog.category}
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="font-bold mb-4 leading-tight"
                  style={{ fontSize: 26, color: "#1e3a5f", letterSpacing: "-0.3px" }}
                >
                  {currentBlog.title}
                </h1>

                {/* Meta: date + views */}
                <div className="flex items-center gap-5 mb-6" style={{ paddingBottom: 20, borderBottom: "1px solid #e2e8f0" }}>
                  <div className="flex items-center gap-2" style={{ fontSize: 13.5, color: "#64748b" }}>
                    {/* Calendar icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{currentBlog.date}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: 13.5, color: "#64748b" }}>
                    {/* Eye icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{currentBlog.views}</span>
                  </div>
                </div>

                {/* Body Text */}
                <div style={{ fontSize: 15, color: "#475569", lineHeight: 1.9 }}>
                  {currentBlog.body.split("\n\n").map((para, i) => (
                    <p key={i} style={{ marginBottom: i < currentBlog.body.split("\n\n").length - 1 ? 18 : 0 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Share Section ── */}
            <div
              className="mt-6 flex items-center gap-4 px-8 py-5 rounded-2xl"
              style={{ background: "#ffffff", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
            >
              <span className="font-bold" style={{ fontSize: 15, color: "#1e3a5f" }}>
                Share On :
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 42, height: 42, border: "2px solid #cbd5e1", color: "#3b82f6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 42, height: 42, border: "2px solid #cbd5e1", color: "#3b82f6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
                {/* Pinterest */}
                <a
                  href="#"
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 42, height: 42, border: "2px solid #cbd5e1", color: "#3b82f6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 42, height: 42, border: "2px solid #cbd5e1", color: "#3b82f6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">



              {/* Latest Blogs Widget */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
                {/* Widget Header */}
                <div
                  className="px-6 py-4"
                  style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 100%)" }}
                >
                  <h3 className="text-white font-bold" style={{ fontSize: 17, letterSpacing: "-0.2px" }}>
                    Latest Blogs
                  </h3>
                </div>

                {/* Blog List */}
                <div className="divide-y" style={{ borderColor: "#eef2f7" }}>
                  {latestBlogs.map((blog, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-start gap-4 p-4 block transition-colors duration-200"
                      style={{ textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Thumbnail */}
                      <div
                        className="flex-shrink-0 rounded-lg overflow-hidden"
                        style={{ width: 78, height: 78 }}
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <p
                          className="font-semibold leading-snug mb-1.5"
                          style={{
                            fontSize: 13.5,
                            color: "#1e3a5f",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {blog.title}
                        </p>
                        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: "#94a3b8" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tags Widget */}
              <div className="bg-white rounded-2xl overflow-hidden mt-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
                <div
                  className="px-6 py-4"
                  style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 100%)" }}
                >
                  <h3 className="text-white font-bold" style={{ fontSize: 17, letterSpacing: "-0.2px" }}>
                    Tags
                  </h3>
                </div>
                <div className="p-5 flex flex-wrap gap-2.5">
                  {["Health", "Wellness", "Cardiology", "ENT", "Nutrition", "Mental Health", "Patient Care", "Ophthalmology"].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{
                        border: "1.5px solid #bfdbfe",
                        color: "#2563eb",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#2563eb";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.borderColor = "#2563eb";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#2563eb";
                        e.currentTarget.style.borderColor = "#bfdbfe";
                      }}
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}