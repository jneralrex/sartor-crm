import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-800 px-6 md:px-20 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Top Navigation & PDF Download */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Go Back
          </button>

          
        </div>

        <h1 className="text-4xl font-bold text-center text-blue-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Effective Date: January 1, 2025
        </p>

        {/* Sections */}
        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, company details, job title, billing details (when applicable).</li>
            <li><strong>Account Information:</strong> Login credentials for platforms such as Sartor CRM, LMS, or other SaaS products.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, time spent on site, and referral source.</li>
            <li><strong>Marketing Data:</strong> Newsletter sign-ups, lead magnet downloads, consultation bookings, and waitlist registrations.</li>
            <li><strong>Support Interactions:</strong> Messages via chatbot “Peter,” contact forms, or support tickets.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our services (CRM, LMS, Blockchain solutions, consulting).</li>
            <li>Personalise your experience on our website and platforms.</li>
            <li>Send newsletters, resources, and marketing communications (only if you opt-in).</li>
            <li>Respond to inquiries, support requests, or consulting calls.</li>
            <li>Process payments and fulfil contractual obligations.</li>
            <li>Detect, prevent, and address fraud or security issues.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>
        </Section>

        <Section title="3. Sharing of Information">
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Service Providers:</strong> Hosting, email marketing, payment processors, analytics, and customer support tools.</li>
            <li><strong>Business Partners:</strong> For joint webinars, co-hosted events, or strategic collaborations (only with your consent).</li>
            <li><strong>Legal Obligations:</strong> If required by law, regulation, or court order.</li>
          </ul>
        </Section>

        <Section title="4. Cookies & Tracking">
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Improve site functionality and user experience.</li>
            <li>Analyze traffic and site usage.</li>
            <li>Deliver relevant ads and remarketing campaigns.</li>
          </ul>
          <p className="mt-2">You can disable cookies in your browser settings, but some features may not function properly.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your data only as long as necessary to fulfil the purposes outlined in this Policy or as required by law.</p>
        </Section>

        <Section title="6. Security">
          <p>We implement industry-standard safeguards, including encryption, access controls, and monitoring. However, no system is 100% secure, and we cannot guarantee absolute protection.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your jurisdiction, you may have rights to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of marketing communications at any time.</li>
            <li>Request data portability.</li>
            <li>Lodge a complaint with a data protection authority.</li>
          </ul>
        </Section>

        <Section title="8. International Users">
          <p>Our services are based in Nigeria but accessible globally (including Canada and other jurisdictions). By using our services, you consent to the transfer of your information to Nigeria and other countries where we operate.</p>
        </Section>

        <Section title="9. Children’s Privacy">
          <p>Our services are not directed to individuals under 18. We do not knowingly collect data from minors.</p>
        </Section>

        <Section title="10. Updates">
          <p>We may update this Privacy Policy periodically. The “Effective Date” at the top will reflect changes.</p>
        </Section>

        <Section title="11. Contact">
          <p>
            📧 Email: <a href="mailto:info@sartor.ng" className="text-blue-600 underline">info@sartor.ng</a><br />
            📞 Phone: +234 905 488 7066<br />
            🏢 Address: Sartor Limited, B40 NELOCAP Estate, Lokogoma District, FCT-Abuja, Nigeria
          </p>
        </Section>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold mb-3 text-blue-800">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{children}</div>
  </div>
);

export default PrivacyPolicy;
