
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

const cyclingWords = ["Client-Focused", "Commercially-Minded", "Results-Driven"];

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
        setIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
        }, 3000); // Change word every 3 seconds
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
        <motion.div className="space-y-6 text-center max-w-4xl mx-auto" variants={fadeUp}>
            <p className="text-lg md:text-xl text-white/80 tracking-widest font-light">
                CRAFTED TO BE
            </p>
            <div className="h-20 md:h-28 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={cyclingWords[index]}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="text-5xl md:text-7xl font-light font-headline leading-tight"
                    >
                        {cyclingWords[index]}
                    </motion.h1>
                </AnimatePresence>
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-headline leading-tight">
                A premier law firm
            </h2>
        </motion.div>

      </motion.div>
    </section>
  );
}


