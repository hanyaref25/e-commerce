import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Returns &amp; Refunds
        </h1>

        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-700 mb-6">
            Changed your mind? You have 30 days from delivery to return most
            items, provided they are unused and in their original packaging.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">
            What can be returned
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Unused products with their original tags and packaging.</li>
            <li>Items that arrived damaged, defective or different.</li>
            <li>Wrong size or colour compared to what you ordered.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">
            What cannot be returned
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Personal care and hygiene products once opened.</li>
            <li>Perishable goods and groceries.</li>
            <li>Items marked as final sale.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">How to return</h2>
          <p className="text-gray-700 mb-4">
            Contact us through the{" "}
            <Link href="/contact" className="text-primary-600 font-semibold">
              contact page
            </Link>{" "}
            with your order number and the reason for the return. We will
            arrange a pickup or send you the return address, then inspect the
            item once it reaches us.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Refund timing</h2>
          <p className="text-gray-700 mb-4">
            Once the return is approved, refunds are issued to the original
            payment method within 5–10 working days. Cash-on-delivery orders are
            refunded by bank transfer or store credit — whichever you prefer.
          </p>
        </div>
      </div>
    </div>
  );
}
