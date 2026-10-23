import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shipping Policy
        </h1>

        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-700 mb-6">
            We deliver everywhere in Egypt. Here is everything you need to know
            about how your order travels from us to you.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Delivery time</h2>
          <p className="text-gray-700 mb-4">
            Orders placed before 3 PM are prepared the same day. Delivery
            normally takes 1–3 working days in Cairo and Giza, and 2–5 working
            days everywhere else. You will receive a call before the courier
            arrives.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Shipping fees</h2>
          <p className="text-gray-700 mb-4">
            Delivery is free on every order, with no minimum value. There are no
            hidden handling charges at checkout.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Tracking your order</h2>
          <p className="text-gray-700 mb-4">
            You can follow the status of every order from{" "}
            <Link href="/my-orders" className="text-primary-600 font-semibold">
              My Orders
            </Link>
            . Each order shows whether it is still processing, paid, or
            delivered.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Failed deliveries</h2>
          <p className="text-gray-700 mb-4">
            If nobody is available at the address, the courier will try again
            the next working day. After three failed attempts the order is
            returned to us and the amount is refunded to the original payment
            method.
          </p>
        </div>
      </div>
    </div>
  );
}
