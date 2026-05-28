
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    heading: "Trusted Legal Partners",
    subheading: "Decades of collective experience guiding clients through Nigeria’s most complex commercial and regulatory challenges."
  },
  {
    heading: "Comprehensive Expertise",
    subheading: "From dispute resolution to finance, real estate to IP, our full-service teams deliver tailored, sector-focused counsel."
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

const sentenceAnimation = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const subheadingAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    }
  }
}


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
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, []);


  return (
    <section ref={targetRef} className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden -mt-20">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/IMG_1162_v2.jpeg"
          alt="A premier law firm"
          className="object-cover w-full h-full absolute inset-0"
          data-ai-hint="office building modern"
          style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto min-h-[300px] md:min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="space-y-6 flex flex-col items-center"
            >
              <motion.h1
                variants={sentenceAnimation}
                className="text-5xl md:text-7xl font-light font-headline leading-tight"
              >
                {slides[index].heading.split("").map((char, i) => (
                  <motion.span key={`${char}-${i}`} variants={letterAnimation}>
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div
                variants={subheadingAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: slides[index].heading.length * 0.04 + 0.5 }}
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg"
              >
                <p className="text-lg md:text-xl text-white/80 tracking-wide font-light max-w-2xl mx-auto">
                  {slides[index].subheading}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
