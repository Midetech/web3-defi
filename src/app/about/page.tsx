"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <Header /> */}
      <main>
        {/* <Hero />
        <ClientLogos />
        <Services />
        <WorkProcess />
        <Testimonials />
        <ContactForm /> */}

        <Image
          layout="responsive"
          width={1000}
          height={500}
          objectFit="contain"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0548e7212383747.673425053401a.png"
          alt=""
        />
      </main>
      {/* <Footer /> */}
    </motion.div>
  );
}
