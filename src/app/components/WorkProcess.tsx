"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Consultation",
    description: "We start by understanding your needs and goals.",
  },
  {
    title: "Planning & Strategy",
    description: "We develop a comprehensive plan tailored to your objectives.",
  },
  {
    title: "Design & Prototyping",
    description: "We create visual designs and interactive prototypes.",
  },
  {
    title: "Development",
    description:
      "Our team brings the designs to life with clean, efficient code.",
  },
  {
    title: "Testing & QA",
    description: "Rigorous testing ensures a high-quality, bug-free product.",
  },
  {
    title: "Launch & Support",
    description:
      "We help you launch and provide ongoing support and maintenance.",
  },
];

export default function WorkProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our work process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <div className="text-2xl font-bold mb-2">{`0${index + 1}`}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
