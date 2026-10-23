import {
  IconArrowBackUp,
  IconHeadset,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

export default function HomeFeatures() {
  const features = [
    {
      id: 1,
      icon: IconTruckDelivery,
      title: "Free Shipping",
      description: "On orders over 500 EGP",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      icon: IconShieldCheck,
      title: "Secure Payment",
      description: "100% secure transactions",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      icon: IconArrowBackUp,
      title: "Easy Returns",
      description: "14-day return policy",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      icon: IconHeadset,
      title: "24/7 Support",
      description: "Dedicated support team",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-center gap-4"
              >
                <div
                  className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${feature.bgColor}`}
                >
                  <Icon stroke={2} className={`size-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
