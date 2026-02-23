"use client";

import { useState } from "react";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `HealthCare Blog ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

This policy applies to all information collected through our website, mobile application, and any related services, sales, marketing, or events (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Services.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Services.`,
  },
  {
    id: "information-collect",
    title: "2. Information We Collect",
    content: `We collect information about you in a variety of ways when you use our Services:

Personal Data: We may collect personally identifiable information such as your name, email address, phone number, date of birth, gender, postal address, and medical history when you voluntarily provide it to us.

Health Information: When you book appointments or use our medical services, we collect health-related information including symptoms, medical conditions, treatment history, prescriptions, and other Protected Health Information (PHI) as defined by HIPAA.

Payment Information: We collect payment card details, billing address, and transaction information when you make purchases through our Services. This information is processed securely through our PCI-compliant payment processors.

Usage Data: We automatically collect certain information when you access our Services, including your IP address, browser type, operating system, access times, pages viewed, and the pages visited before navigating to our Services.

Device Information: We collect information about the device you use to access our Services, including hardware model, unique device identifiers, and mobile network information.

Cookies and Tracking Technologies: We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and preferences.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the information we collect for various purposes, including:

Healthcare Services: To provide, maintain, and improve our healthcare services, schedule appointments, process payments, communicate with healthcare providers, and maintain medical records.

Communication: To send you appointment reminders, treatment updates, health tips, newsletters, marketing communications, and respond to your inquiries and requests.

Personalization: To personalize your experience, understand your preferences, and provide content and features that match your interests.

Analytics and Improvement: To analyze usage patterns, diagnose technical problems, improve our Services, develop new features, and conduct research.

Legal Compliance: To comply with legal obligations, enforce our Terms and Conditions, protect our rights and property, prevent fraud, and ensure the safety of our users.

With Your Consent: For any other purpose with your explicit consent.`,
  },
  {
    id: "information-sharing",
    title: "4. Information Sharing and Disclosure",
    content: `We may share your information in the following circumstances:

Healthcare Providers: We share your health information with licensed healthcare professionals, specialists, laboratories, and pharmacies as necessary to provide you with medical care and treatment.

Service Providers: We may share your information with third-party vendors, consultants, and service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.

Business Transfers: In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.

Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).

Protection of Rights: We may disclose information to protect and defend our rights and property, prevent fraud, or protect the personal safety of our users or the public.

With Your Consent: We may share your information for any other purpose with your consent.

We will never sell your personal health information to third parties for marketing purposes.`,
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

Encryption: All sensitive data is encrypted in transit using SSL/TLS protocols and at rest using industry-standard encryption methods.

Access Controls: We restrict access to personal information to authorized employees, contractors, and agents who need to know that information to operate, develop, or improve our Services.

HIPAA Compliance: We maintain compliance with the Health Insurance Portability and Accountability Act (HIPAA) and implement appropriate safeguards for Protected Health Information.

Regular Audits: We conduct regular security audits and vulnerability assessments to identify and address potential security risks.

Secure Infrastructure: Our servers are hosted in secure, SOC 2 certified data centers with physical security controls and redundant systems.

Despite our security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.`,
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

Medical Records: In accordance with healthcare regulations and HIPAA requirements, we retain medical records and health information for a minimum of 7 years from the date of the last treatment or as required by state law, whichever is longer.

Account Information: We retain your account information for as long as your account is active or as needed to provide you services.

Legal Obligations: We may retain certain information as required by law or for legitimate business purposes, such as dispute resolution, enforcement of our agreements, and compliance with legal obligations.

When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policies and applicable laws.`,
  },
  {
    id: "your-rights",
    title: "7. Your Privacy Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information:

Access: You have the right to request access to the personal information we hold about you.

Correction: You have the right to request that we correct inaccurate or incomplete personal information.

Deletion: You have the right to request deletion of your personal information, subject to certain exceptions (e.g., legal obligations, medical records retention).

Restriction: You have the right to request that we restrict the processing of your personal information in certain circumstances.

Portability: You have the right to receive a copy of your personal information in a structured, commonly used, and machine-readable format.

Objection: You have the right to object to our processing of your personal information for direct marketing purposes.

Withdrawal of Consent: Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.

To exercise these rights, please contact us using the information provided in the "Contact Us" section. We will respond to your request within 30 days.`,
  },
  {
    id: "hipaa-rights",
    title: "8. HIPAA Privacy Rights",
    content: `If you are a patient receiving healthcare services through our platform, you have specific rights under HIPAA regarding your Protected Health Information (PHI):

Right to Access: You have the right to inspect and obtain a copy of your medical records and other health information.

Right to Amendment: You have the right to request amendments to your health information if you believe it is incorrect or incomplete.

Right to an Accounting: You have the right to receive an accounting of disclosures of your health information.

Right to Request Restrictions: You have the right to request restrictions on certain uses and disclosures of your health information.

Right to Confidential Communications: You have the right to request that we communicate with you about your health information by alternative means or at alternative locations.

Right to a Paper Copy: You have the right to obtain a paper copy of this Privacy Policy upon request.

Right to File a Complaint: You have the right to file a complaint with us or with the Secretary of the Department of Health and Human Services if you believe your privacy rights have been violated.

For more information about your HIPAA rights or to exercise these rights, please contact our Privacy Officer at privacy@healthcare.com.`,
  },
  {
    id: "cookies-tracking",
    title: "9. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.

Types of Cookies We Use:

Essential Cookies: These cookies are necessary for the Services to function and cannot be switched off in our systems.

Performance Cookies: These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Services.

Functionality Cookies: These cookies enable the Services to provide enhanced functionality and personalization.

Targeting Cookies: These cookies may be set through our Services by our advertising partners to build a profile of your interests and show you relevant advertisements.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.

Third-Party Analytics: We use third-party analytics services, such as Google Analytics, to help us understand how users engage with our Services. You can opt-out of Google Analytics by installing the Google Analytics opt-out browser add-on.`,
  },
  {
    id: "children-privacy",
    title: "10. Children's Privacy",
    content: `Our Services are not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.

If we become aware that we have collected personal information from children under 13 without verification of parental consent, we will take steps to remove that information from our servers.

For children between 13 and 18 years of age, we require parental or guardian consent before collecting any personal health information or providing healthcare services.`,
  },
  {
    id: "international-transfers",
    title: "11. International Data Transfers",
    content: `Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.

If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including personal data, to the United States and process it there.

We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your personal data will take place to an organization or a country unless there are adequate controls in place including the security of your data.

For European Economic Area (EEA) residents, we comply with the EU General Data Protection Regulation (GDPR) and ensure that appropriate safeguards are in place for international data transfers, such as Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    id: "california-privacy",
    title: "12. California Privacy Rights (CCPA)",
    content: `If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):

Right to Know: You have the right to request that we disclose what personal information we collect, use, disclose, and sell about you.

Right to Delete: You have the right to request deletion of your personal information, subject to certain exceptions.

Right to Opt-Out: You have the right to opt-out of the sale of your personal information. We do not sell personal information.

Right to Non-Discrimination: You have the right not to receive discriminatory treatment for exercising your CCPA rights.

Authorized Agent: You may designate an authorized agent to make requests on your behalf.

To exercise these rights, please contact us at privacy@healthcare.com or call us at +1 (555) 123-4567. We will verify your identity before processing your request.

Categories of Personal Information We Collect:
• Identifiers (name, email, phone number, address)
• Medical and health information
• Payment and financial information
• Internet activity and device information
• Geolocation data
• Professional or employment information`,
  },
  {
    id: "gdpr-compliance",
    title: "13. GDPR Compliance (European Users)",
    content: `If you are located in the European Economic Area (EEA), we process your personal data in compliance with the General Data Protection Regulation (GDPR).

Legal Basis for Processing:
• Consent: We process certain personal data based on your explicit consent.
• Contract: We process data necessary to fulfill our contractual obligations to you.
• Legal Obligation: We process data to comply with legal requirements.
• Legitimate Interests: We process data based on our legitimate business interests, provided your rights and freedoms are not overridden.

Your GDPR Rights:
• Right to be informed about how your data is used
• Right of access to your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Rights related to automated decision-making and profiling

Data Protection Officer: You can contact our Data Protection Officer at dpo@healthcare.com.

Supervisory Authority: You have the right to lodge a complaint with your local data protection authority if you believe we have not complied with applicable data protection laws.`,
  },
  {
    id: "third-party-links",
    title: "14. Third-Party Websites and Services",
    content: `Our Services may contain links to third-party websites and services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party sites.

We encourage you to review the privacy policies of every website you visit. This Privacy Policy applies only to information collected by our Services.

Third-party services we may integrate with include:
• Payment processors (Stripe, PayPal)
• Analytics providers (Google Analytics)
• Email service providers
• Appointment scheduling tools
• Telemedicine platforms

These third parties have their own privacy policies, and we do not have control over their practices.`,
  },
  {
    id: "changes-policy",
    title: "15. Changes to This Privacy Policy",
    content: `We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.

We will notify you of any material changes by:
• Posting the new Privacy Policy on this page
• Updating the "Last Updated" date at the top of this Privacy Policy
• Sending you an email notification (if you have provided your email address)
• Displaying a prominent notice on our website

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.

Your continued use of our Services after we post any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide by the modified Privacy Policy.`,
  },
  {
    id: "contact-us",
    title: "16. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

Privacy Officer
HealthCare Blog
1234 Health Street, Suite 100
New York, NY 10001
United States

Email: privacy@healthcare.com
Phone: +1 (555) 123-4567
Fax: +1 (555) 123-4568

Office Hours: Monday - Friday, 9:00 AM - 6:00 PM EST

For HIPAA-related inquiries or to exercise your HIPAA rights, please contact our Privacy Officer at the email address above.

For GDPR-related inquiries or to exercise your GDPR rights, please contact our Data Protection Officer at dpo@healthcare.com.

We will respond to your inquiry within 30 days.`,
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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

              {/* Compliance Badges */}
              <div className="mt-6 bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
                <h4 className="font-bold mb-4" style={{ fontSize: 14, color: "#1e3a5f" }}>
                  Compliance
                </h4>
                <div className="space-y-3">
                  {["HIPAA Compliant", "GDPR Compliant", "CCPA Compliant", "SOC 2 Certified"].map((badge) => (
                    <div key={badge} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 lg:p-10" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
              
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

              {/* Important Notice */}
              <div
                className="rounded-xl p-6 mt-8"
                style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1px solid #bfdbfe" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ fontSize: 15, color: "#1e3a5f" }}>
                      Your Privacy Matters
                    </h4>
                    <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
                      We are committed to protecting your privacy and maintaining the security of your personal health information. If you have any questions or concerns about this Privacy Policy or our data practices, please don't hesitate to contact our Privacy Officer.
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