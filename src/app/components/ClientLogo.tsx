"use client";

import { motion } from "framer-motion";

const clients = ["Amazon", "Airbnb", "HubSpot", "Notion", "Netflix", "Zoom"];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by industry leaders
        </h2>
        <div className="flex justify-around items-center flex-wrap">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="m-4"
            >
              <img
                src={`/${client.toLowerCase()}-logo.svg`}
                alt={client}
                className="h-8"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
