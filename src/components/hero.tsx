
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2.0,
      ease: "easeOut",
    },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};


export default function Hero() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={targetRef} className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden -mt-20">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/IMG_1162_v2.jpeg"
          alt="A premier law firm"
          fill
          className="object-cover"
          priority
          data-ai-hint="office building modern"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 text-center max-w-4xl mx-auto" variants={fadeUp}>
            <h1 className="text-4xl md:text-6xl font-light font-headline leading-tight">
                Trusted Legal Partners
            </h1>
            <p className="text-lg md:text-xl text-white/80 tracking-wide">
                Decades of collective experience, dedicated to your success.
            </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
