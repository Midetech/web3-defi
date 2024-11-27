"use client";

import { motion } from "framer-motion";

const services = [
  { name: "Website Development", icon: "🌐" },
  { name: "Mobile App Development", icon: "📱" },
  { name: "UX/UI Design", icon: "🎨" },
  { name: "SEO Services", icon: "🔍" },
  { name: "Cloud Services", icon: "☁️" },
  { name: "Cyber Security", icon: "🔒" },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
