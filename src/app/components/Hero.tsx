"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          Navigating the digital landscape for success
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8"
        >
          We help businesses thrive in the digital age with cutting-edge
          solutions and expert guidance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
