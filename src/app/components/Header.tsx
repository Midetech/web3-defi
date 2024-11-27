"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex justify-between items-center py-4 px-6 bg-white"
    >
      <div className="flex items-center">
        {/* <img
          src="/logo.svg"
          alt="Quantum Cloud Labs"
          className="h-8 w-8 mr-2"
        /> */}
        <span className="font-bold text-xl">Quantum Cloud Labs</span>
      </div>
      <nav>
        <ul className="flex space-x-4 md:flex-wrap">
          {["About us", "Services", "Projects", "Request a quote"].map(
            (item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  {item}
                </Link>
              </motion.li>
            )
          )}
        </ul>
      </nav>
    </motion.header>
  );
}
