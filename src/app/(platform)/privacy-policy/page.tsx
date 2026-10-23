import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: October 3, 2026</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, including your name, email address, postal address, phone number, and payment information when you make a purchase.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to process your orders, communicate with you about your account, provide customer support, and send you marketing communications.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your browsing experience.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to access, update, or delete your personal information at any time. You can also opt-out of receiving marketing communications from us.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@ecommerce.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
