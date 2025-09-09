import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 px-6 md:px-20 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Go Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Go Back
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Effective Date: January 1, 2025
        </p>

        {/* Sections */}
        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Information You Provide:</strong> name, email, phone,
              business info, payment details.
            </li>
            <li>
              <strong>Automatically Collected:</strong> IP, browser, device,
              pages visited, cookies.
            </li>
            <li>
              <strong>From Third Parties:</strong> analytics tools, payment
              processors, integrations.
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>To deliver and manage our SaaS and consulting services.</li>
            <li>To personalize your experience and improve our platforms.</li>
            <li>
              To send updates, newsletters, and promotional material (opt-out
              available).
            </li>
            <li>To comply with legal and regulatory obligations.</li>
          </ul>
        </Section>

        <Section title="3. How We Share Your Information">
          <p>
            Sartor does <strong>not sell</strong> your data. We may share it
            with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Trusted third-party service providers</li>
            <li>Business affiliates (under confidentiality agreements)</li>
            <li>Legal or regulatory bodies as required by law</li>
            <li>Buyers/investors in case of merger or acquisition</li>
          </ul>
        </Section>

        <Section title="4. Cookies & Tracking">
          <p>
            We use cookies and similar tools to improve user experience, track
            traffic, and personalize content. You may disable cookies in your
            browser settings.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your data as long as necessary for service delivery,
            legal, and operational purposes. You can request deletion of your
            data at any time.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            We implement technical and organizational measures to protect your
            data, but no system is 100% secure. Protect your account credentials
            at all times.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>Under NDPR and other laws, you may:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Access or update your data</li>
            <li>Request data deletion or correction</li>
            <li>Object to certain processing</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-2">
            Contact us at{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:privacy@sartor.ng"
            >
              privacy@sartor.ng
            </a>
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our services are not directed to users under 18. We do not knowingly
            collect data from children.
          </p>
        </Section>

        <Section title="9. International Users">
          <p>
            Your data may be transferred or processed outside Nigeria where
            applicable service providers are located.
          </p>
        </Section>

        <Section title="10. Changes to Policy">
          <p>
            We may update this policy periodically. Changes take effect upon
            posting. Continued use of our services indicates acceptance.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:info@sartor.ng"
              className="text-blue-600 underline"
            >
              info@sartor.ng
            </a>
            <br />
            📞 Phone: +234 905 488 7066
            <br />
            🏢 Address: Sartor Limited, B40 NELOCAP Estate, Lokogoma District,
            FCT-Abuja, Nigeria
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
