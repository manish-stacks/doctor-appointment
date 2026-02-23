"use client";

import Pagination from "@/components/ui/custom/pagination";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    category: "Health & Wellness",
    title: "The Importance of Regular Health Check-ups",
    description:
      "In today's busy world, many people tend to visit a doctor only when they are sick or experiencing discomfort. However, regular health check-ups are a crucial part of maintaining long-term well-being and catching potential issues early before they become serious.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    category: "Ophthalmology",
    title: "Understanding Common Eye Disorders Symptoms and Treatments",
    description:
      "In today's busy world, many people tend to visit a doctor only when they are sick or experiencing discomfort. Eye health is often overlooked until a serious problem arises. Understanding common eye disorders can help you take proactive steps.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    category: "Patient Care",
    title: "Navigating the Doctor Patient Relationship Tips for Better Communication",
    description:
      "In today's busy world, many people tend to visit a doctor only when they are sick or experiencing discomfort. A strong doctor-patient relationship is built on trust, open communication, and mutual respect.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    category: "Nutrition",
    title: "How a Balanced Diet Can Transform Your Overall Health",
    description:
      "What you eat plays a massive role in how you feel every single day. A balanced diet rich in vitamins, minerals, and antioxidants supports immunity, energy levels, and mental clarity in ways most people never realize.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    category: "Mental Health",
    title: "Breaking the Stigma Around Seeking Help for Mental Wellness",
    description:
      "Mental health awareness has grown significantly in recent years, yet stigma still prevents many individuals from reaching out for the support they need. Understanding why people hesitate and how to overcome that barrier is essential.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    category: "Cardiology",
    title: "Warning Signs of Heart Disease You Should Never Ignore",
    description:
      "Heart disease remains one of the leading causes of death worldwide. Recognizing the early warning signs can literally save your life. Many symptoms are subtle and easy to dismiss, which is why awareness and regular screenings are so important.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
];

const categories = ["All", "Health & Wellness", "Ophthalmology", "Patient Care", "Nutrition", "Mental Health", "Cardiology"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#f8f9fa" }}>
      {/* Header */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "260px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute rounded-full opacity-10"
          style={{ width: 320, height: 320, background: "#f472b6", top: -80, left: -60 }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{ width: 200, height: 200, background: "#2563eb", bottom: -60, right: 120 }}
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
          <h1 className="text-4xl font-bold text-white mb-3" style={{ letterSpacing: "-0.5px" }}>
            Health Insights & <span style={{ color: "#3b82f6" }}>Medical Knowledge</span>
          </h1>
          <p className="text-base" style={{ color: "#94a3b8", maxWidth: 540 }}>
            Stay informed with expert articles covering wellness, treatment, and the latest in healthcare.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeCategory === cat ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#ffffff",
                color: activeCategory === cat ? "#ffffff" : "#3b82f6",
                boxShadow: activeCategory === cat
                  ? "0 4px 14px rgba(59,130,246,0.4)"
                  : "0 1px 3px rgba(0,0,0,0.08)",
                border: activeCategory === cat ? "none" : "1px solid #3b82f6",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-gray-500">No articles found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 text-sm font-semibold"
              style={{ color: "#f472b6" }}
            >
              Show all articles
            </button>
          </div>
        )}
        <Pagination totalPages={Math.ceil(filtered.length / 6)} page={1} setPage={() => { }} />
      </div>
    </div>
  );
}

/* ─── Individual Blog Card ─── */
function BlogCard({ blog }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="overflow-hidden"
      style={{
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.12)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ height: 230 }}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          style={{
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-white text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              boxShadow: "0 2px 10px rgba(59,130,246,0.4)",
              letterSpacing: "0.3px",
            }}
          >
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5" style={{ paddingBottom: 24 }}>
        {/* Title */}

        <h3
          className="font-bold mb-3 leading-snug"
          style={{
            fontSize: 17,
            color: "#1e293b",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 48,
          }}
        >
          {blog.title}
        </h3>

        {/* Description */}
        <p
          className="mb-5"
          style={{
            fontSize: 13.5,
            color: "#64748b",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 66,
          }}
        >
          {blog.description}
        </p>

        {/* Continue Reading Link */}
        <a
          href="#"
          className="inline-flex items-center gap-1 font-semibold"
          style={{
            fontSize: 13.5,
            color: "#f43f5e",
            textDecoration: "none",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "6px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "4px";
          }}
        >
          Continue Reading
          <span style={{ fontSize: 15 }}>»</span>
        </a>
      </div>
    </div>
  );
}