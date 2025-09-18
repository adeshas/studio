
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

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

const slides = [
    {
        heading: "Trusted Legal Partners",
        subheading: "Decades of collective experience guiding clients through Nigeria’s most complex commercial and regulatory challenges."
    },
    {
        heading: "Comprehensive Expertise",
        subheading: "From dispute resolution to finance, real estate to IP—our full-service teams deliver tailored, sector-focused counsel."
    },
    {
        heading: "Client-Centric Solutions",
        subheading: "We dive deep into your business, crafting practical strategies that protect your interests and drive results."
    },
    {
        heading: "Integrity & Excellence",
        subheading: "Unwavering commitment to ethical standards, efficiency and clear communication at every step."
    }
];

export default function Hero() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);


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
        <div className="text-center max-w-4xl mx-auto h-48 md:h-40 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-light font-headline leading-tight">
                        {slides[index].heading}
                    </h1>
                     <p className="text-lg md:text-xl text-white/80 tracking-wide font-light max-w-2xl mx-auto">
                        {slides[index].subheading}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}
