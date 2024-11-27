"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    content:
      "Working with Quantum Cloud Labs has been a game-changer for our business. Their expertise and dedication are unmatched.",
  },
  {
    name: "Jane Smith",
    role: "CTO, InnovateCo",
    content:
      "The team at Quantum Cloud Labs delivered beyond our expectations. Their solutions have significantly improved our operations.",
  },
  {
    name: "Mike Johnson",
    role: "Founder, StartupX",
    content:
      "I highly recommend Quantum Cloud Labs. Their innovative approach and technical skills are truly impressive.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <p className="text-lg mb-4">
                {testimonials[currentIndex].content}
              </p>
              <p className="font-semibold">{testimonials[currentIndex].name}</p>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-white p-2 rounded-full shadow-md"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-white p-2 rounded-full shadow-md"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
