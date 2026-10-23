import Link from "next/link";

const values = [
  {
    title: "Curated quality",
    body: "Every product is sourced from trusted brands and checked before it reaches you.",
  },
  {
    title: "Fast delivery",
    body: "Orders are packed the same day and delivered to your door across Egypt.",
  },
  {
    title: "Secure shopping",
    body: "Pay by card through Stripe or cash on delivery — your data stays protected.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About FreshCart</h1>

        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <p className="text-gray-700">
            FreshCart is an online store built around a simple idea: shopping
            for everyday essentials should be fast, clear and enjoyable. From
            electronics and fashion to home, beauty and groceries, we bring
            thousands of products together in one place.
          </p>

          <p className="text-gray-700">
            We work with official brands and trusted suppliers so that what you
            order is what arrives — in the condition you expect, at the price
            you saw. Our catalogue is organised by category and subcategory, so
            finding the right thing takes seconds rather than minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="border border-gray-100 rounded-2xl p-5"
              >
                <h2 className="font-semibold text-gray-900 mb-2">
                  {value.title}
                </h2>
                <p className="text-sm text-gray-600">{value.body}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-700">
            Have a question or need a hand with an order? Our team is one
            message away — visit the{" "}
            <Link href="/contact" className="text-primary-600 font-semibold">
              contact page
            </Link>{" "}
            or browse the{" "}
            <Link href="/help" className="text-primary-600 font-semibold">
              help center
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
