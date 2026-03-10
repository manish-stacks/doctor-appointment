"use client";

import { useState } from "react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing and using HealthCare Blog's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.

These terms apply to all visitors, users, and others who access or use our services. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting on this page. Your continued use of the services after any such changes constitutes your acceptance of the new terms.`,
  },
  {
    id: "medical-disclaimer",
    title: "2. Medical Disclaimer",
    content: `The information provided on this website is for general informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately. HealthCare Blog does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the site.`,
  },
  {
    id: "user-accounts",
    title: "3. User Accounts and Registration",
    content: `When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.

You are responsible for safeguarding the password that you use to access the services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

You may not use as a username the name of another person or entity that is not lawfully available for use, or a name or trademark that is subject to any rights of another person or entity without appropriate authorization.`,
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property Rights",
    content: `The services and their original content, features, and functionality are and will remain the exclusive property of HealthCare Blog and its licensors. The services are protected by copyright, trademark, and other laws of both the United States and foreign countries.

Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HealthCare Blog. You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor may you reverse engineer or attempt to extract the source code of that software.`,
  },
  {
    id: "prohibited-uses",
    title: "5. Prohibited Uses",
    content: `You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the services:

• In any way that violates any applicable national or international law or regulation
• To transmit, or procure the sending of, any advertising or promotional material without our prior written consent
• To impersonate or attempt to impersonate HealthCare Blog, a HealthCare Blog employee, another user, or any other person or entity
• To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the services
• To use the services in any manner that could disable, overburden, damage, or impair the site
• To use any robot, spider, or other automatic device, process, or means to access the services for any purpose
• To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful`,
  },
  {
    id: "user-content",
    title: "6. User-Generated Content",
    content: `Our services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the services, including its legality, reliability, and appropriateness.

By posting content on or through the services, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the services. You retain any and all of your rights to any content you submit, post, or display on or through the services.

You represent and warrant that: (i) the content is yours or you have the right to use it, (ii) the posting of your content on or through the services does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.`,
  },
  {
    id: "appointment-booking",
    title: "7. Appointment Booking and Cancellation",
    content: `When you book an appointment through our services, you agree to provide accurate and complete information. Appointments are subject to availability and confirmation by the healthcare provider.

Cancellation Policy: You may cancel or reschedule an appointment up to 24 hours before the scheduled time without penalty. Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee. No-shows may result in charges and may affect your ability to book future appointments.

We reserve the right to cancel or reschedule appointments due to provider unavailability, emergencies, or other unforeseen circumstances. In such cases, we will make reasonable efforts to notify you and offer alternative appointment times.`,
  },
  {
    id: "payment-terms",
    title: "8. Payment Terms and Fees",
    content: `Certain services or features may require payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made through the services.

You agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.

All fees are non-refundable unless otherwise stated. We reserve the right to change our fees at any time, but we will provide you with reasonable notice of such changes.`,
  },
  {
    id: "limitation-liability",
    title: "9. Limitation of Liability",
    content: `In no event shall HealthCare Blog, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:

• Your access to or use of or inability to access or use the services
• Any conduct or content of any third party on the services
• Any content obtained from the services
• Unauthorized access, use, or alteration of your transmissions or content

This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if HealthCare Blog has been advised of the possibility of such damage.`,
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    content: `You agree to defend, indemnify, and hold harmless HealthCare Blog and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:

• Your use and access of the services
• Your violation of any term of these Terms
• Your violation of any third-party right, including without limitation any copyright, property, or privacy right
• Any claim that your content caused damage to a third party`,
  },
  {
    id: "termination",
    title: "11. Termination",
    content: `We may terminate or suspend your account and bar access to the services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

If you wish to terminate your account, you may simply discontinue using the services or contact us to request account deletion.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
  },
  {
    id: "governing-law",
    title: "12. Governing Law and Jurisdiction",
    content: `These Terms shall be governed and construed in accordance with the laws of the United States and the State of New York, without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.`,
  },
  {
    id: "changes-terms",
    title: "13. Changes to Terms",
    content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms.`,
  },
  {
    id: "contact",
    title: "14. Contact Information",
    content: `If you have any questions about these Terms and Conditions, please contact us:

By email: legal@healthcare.com
By phone: +1 (555) 123-4567
By mail: 1234 Health Street, Suite 100, New York, NY 10001, United States

Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM EST.`,
  },
];

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>

     

      {/* ── Hero Header ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 200, background: "linear-gradient(135deg, #1e3a5f 0%, #1a2e4a 50%, #0f3460 100%)" }}
      >
        <div className="absolute rounded-full opacity-10" style={{ width: 250, height: 250, background: "#3b82f6", top: -60, right: -40 }} />
        <div className="absolute rounded-full opacity-8" style={{ width: 180, height: 180, background: "#60a5fa", bottom: -60, left: 100 }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "#60a5fa" }}>
            Legal
          </p>
          <h1 className="text-4xl font-bold text-white" style={{ letterSpacing: "-0.5px" }}>
            Terms & Conditions
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 8 }}>
            Last Updated: February 4, 2026
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Table of Contents (Sticky) ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
                <div
                  className="px-5 py-4"
                  style={{ background: "linear-gradient(135deg, #1e3a5f, #1a2e4a)" }}
                >
                  <h3 className="text-white font-bold" style={{ fontSize: 16 }}>
                    Table of Contents
                  </h3>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-4 py-2.5 rounded-lg mb-1 transition-all duration-200"
                      style={{
                        fontSize: 13,
                        color: activeSection === section.id ? "#2563eb" : "#475569",
                        background: activeSection === section.id ? "#eff6ff" : "transparent",
                        fontWeight: activeSection === section.id ? 600 : 500,
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 lg:p-10" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
              
              {/* Introduction */}
              <div className="mb-10 pb-8" style={{ borderBottom: "2px solid #e2e8f0" }}>
                <h2 className="font-bold mb-4" style={{ fontSize: 24, color: "#1e3a5f" }}>
                  Introduction
                </h2>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>
                  Welcome to HealthCare Blog. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our services, you agree to comply with and be bound by these Terms. Please read them carefully before using our platform.
                </p>
              </div>

              {/* All Sections */}
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="mb-10 pb-8"
                  style={{ borderBottom: idx < sections.length - 1 ? "1px solid #e2e8f0" : "none" }}
                >
                  <h2 className="font-bold mb-4" style={{ fontSize: 20, color: "#1e3a5f" }}>
                    {section.title}
                  </h2>
                  <div style={{ fontSize: 15, color: "#475569", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                    {section.content}
                  </div>
                </div>
              ))}

              {/* Agreement Notice */}
              <div
                className="rounded-xl p-6 mt-8"
                style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1px solid #bfdbfe" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ fontSize: 15, color: "#1e3a5f" }}>
                      Acknowledgment
                    </h4>
                    <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      By using HealthCare Blog&apos;s services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you have any questions or concerns, please contact our legal team.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}