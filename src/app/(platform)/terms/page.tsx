import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: October 3, 2026</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to our e-commerce platform. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitations</h2>
            <p className="text-gray-700 mb-4">
              In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
