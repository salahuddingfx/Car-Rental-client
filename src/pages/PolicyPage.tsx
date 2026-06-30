import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, Cookie, RotateCcw, Lock, ChevronRight } from 'lucide-react';

const policies: Record<string, { title: string; icon: React.ElementType; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    sections: [
      { heading: 'Information We Collect', body: 'We collect personal information you provide directly, such as your name, email address, phone number, payment details, and driving license information when you create an account or make a booking. We also automatically collect certain data when you use our platform, including IP address, browser type, device information, and usage patterns.' },
      { heading: 'How We Use Your Information', body: 'Your information is used to process bookings, verify your identity, communicate with you about your reservations, improve our services, personalize your experience, and send marketing communications (with your consent). We may also use aggregated data for analytics and business optimization.' },
      { heading: 'Data Sharing', body: 'We do not sell your personal information. We may share your data with trusted third parties including payment processors, insurance providers, and vehicle owners strictly for booking fulfillment. All third parties are contractually obligated to protect your data.' },
      { heading: 'Data Security', body: 'We implement industry-standard encryption (SSL/TLS), secure payment gateways, and regular security audits to protect your personal information. Access to your data is restricted to authorized personnel only.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data at any time through your account settings. You may also request a copy of your data or withdraw consent for marketing communications. Contact us at privacy@aether.com for any data-related requests.' },
      { heading: 'Cookie Policy', body: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.' },
      { heading: 'Updates to This Policy', body: 'We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. We encourage you to review this policy regularly to stay informed about how we protect your information.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    sections: [
      { heading: 'Acceptance of Terms', body: 'By accessing or using AETHER Portal, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. These terms constitute a legally binding agreement between you and AETHER.' },
      { heading: 'Eligibility', body: 'You must be at least 21 years old and hold a valid driving license to rent a vehicle through our platform. You also represent that all information you provide is accurate and complete. We reserve the right to verify your identity and credentials.' },
      { heading: 'Booking and Payments', body: 'All bookings are subject to availability and confirmation. Prices displayed are in BDT and include applicable taxes unless stated otherwise. Full payment or a security deposit may be required at the time of booking. We accept major credit cards, debit cards, and mobile banking.' },
      { heading: 'Cancellation Policy', body: 'Cancellations made 48 hours or more before the pickup time are eligible for a full refund. Cancellations within 48 hours may incur a fee of up to 50% of the booking amount. No-shows will be charged the full booking amount.' },
      { heading: 'User Responsibilities', body: 'You agree to use the vehicles in accordance with all traffic laws and regulations. You are responsible for any traffic violations, tolls, or fines incurred during your rental period. Vehicles must be returned in the same condition as received, with normal wear and tear excepted.' },
      { heading: 'Liability', body: 'AETHER Portal acts as a marketplace connecting renters with vehicle owners. We are not liable for direct, indirect, incidental, or consequential damages arising from your use of our services, to the fullest extent permitted by law.' },
      { heading: 'Prohibited Activities', body: 'You may not use our platform for any unlawful purpose, including but not limited to fraud, misrepresentation, unauthorized commercial use, or interfering with the proper functioning of the service.' },
      { heading: 'Termination', body: 'We reserve the right to suspend or terminate your account at our sole discretion for violations of these terms, fraudulent activity, or any conduct that we deem harmful to our community or brand.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    icon: Cookie,
    sections: [
      { heading: 'What Are Cookies', body: 'Cookies are small text files stored on your device by your web browser. They help us remember your preferences, understand how you use our site, and improve your overall experience. Cookies may be set by us (first-party) or by third-party services we use.' },
      { heading: 'Types of Cookies We Use', body: 'Essential Cookies: Required for basic site functionality including secure login and booking management. Performance Cookies: Help us understand how visitors interact with our site through anonymous analytics. Functionality Cookies: Remember your preferences and settings for a personalized experience. Targeting Cookies: Used to deliver relevant advertisements and measure their effectiveness.' },
      { heading: 'Third-Party Cookies', body: 'We may use third-party services such as Google Analytics, payment processors, and social media platforms that set their own cookies. These third parties have their own cookie policies governing the use of your data.' },
      { heading: 'Managing Cookies', body: 'You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that disabling certain cookies may affect the functionality of our platform and limit your ability to use all features.' },
      { heading: 'Updates', body: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.' },
    ],
  },
  refund: {
    title: 'Refund Policy',
    icon: RotateCcw,
    sections: [
      { heading: 'Refund Eligibility', body: 'Refunds are available for cancellations made at least 48 hours before the scheduled pickup time. Cancellations made within 48 hours may be subject to a cancellation fee of up to 50% of the total booking amount.' },
      { heading: 'Processing Time', body: 'Once approved, refunds are processed within 5-10 business days. The refund will be issued to the original payment method used during booking. You will receive a confirmation email once the refund has been initiated.' },
      { heading: 'Partial Refunds', body: 'Partial refunds may be issued in cases where the vehicle is returned early due to mechanical issues on the owner\'s part, or if the vehicle does not match the listed specifications. Each case is evaluated individually.' },
      { heading: 'Non-Refundable Charges', body: 'Service fees, late return fees, additional driver fees, and fuel charges are non-refundable. Any damage costs assessed after the rental period will be charged separately.' },
      { heading: 'How to Request a Refund', body: 'To request a refund, please contact our support team through the dashboard or email us at support@aether.com with your booking ID and reason for cancellation.' },
    ],
  },
  security: {
    title: 'Security',
    icon: Lock,
    sections: [
      { heading: 'Data Encryption', body: 'All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security) protocol. Sensitive information such as passwords and payment details are hashed and encrypted at rest.' },
      { heading: 'Payment Security', body: 'All payments are processed through PCI-DSS compliant payment gateways. We do not store full credit card numbers, CVV codes, or other sensitive payment data on our servers.' },
      { heading: 'Account Protection', body: 'We recommend using strong, unique passwords and enabling two-factor authentication for your account. You are responsible for maintaining the confidentiality of your login credentials.' },
      { heading: 'Security Monitoring', body: 'Our systems are monitored 24/7 for suspicious activity. We employ intrusion detection systems, regular security audits, and vulnerability assessments to identify and mitigate potential threats.' },
      { heading: 'Incident Response', body: 'In the event of a security breach, we have a comprehensive incident response plan. Affected users will be notified within 72 hours, and we will take immediate steps to contain and resolve the issue.' },
      { heading: 'Reporting Vulnerabilities', body: 'If you discover a security vulnerability on our platform, please report it immediately to security@aether.com. We take all reports seriously and will respond promptly.' },
    ],
  },
};

export const PolicyPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const policy = policies[policyType || ''];

  useEffect(() => {
    if (policy) document.title = `${policy.title} — AETHER`;
    window.scrollTo(0, 0);
  }, [policy]);

  if (!policy) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Page Not Found</h1>
          <p className="text-neutral-500 mb-6">This policy page doesn't exist.</p>
          <Link to="/" className="text-accent-blue hover:underline text-sm">Return Home</Link>
        </div>
      </div>
    );
  }

  const Icon = policy.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6 font-display uppercase tracking-widest">
          <Link to="/" className="hover:text-accent-blue transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-600 font-semibold">{policy.title}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-4">
            <Icon size={22} className="text-accent-blue" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">{policy.title}</h1>
          <p className="text-neutral-500 text-sm mt-2">Last updated: June 2026</p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {policy.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-2">{section.heading}</h2>
              <p className="text-neutral-600 text-sm leading-relaxed">{section.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-5 bg-neutral-50 border border-neutral-200/60 rounded-xl">
          <p className="text-sm text-neutral-600">
            Have questions about our policies? Contact us at{' '}
            <a href="mailto:support@aether.com" className="text-accent-blue hover:underline">support@aether.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
