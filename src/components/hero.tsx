
"use client";

import { motion, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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

const texts = [
    "A Premier Law Firm",
    "Expert Legal Solutions",
    "Client-Focused Approach",
    "Integrity and Excellence",
];

const typingSpeed = 0.12;
const deleteSpeed = 0.1;
const delayBeforeDelete = 1.75;


export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const baseText = useMotionValue("");
    const displayText = useTransform(baseText, (latest) => latest);
    const [isDeleting, setIsDeleting] = useState(false);

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        const fullText = texts[textIndex];

        const typingAnimation = animate(0, fullText.length, {
            type: "tween",
            duration: fullText.length * typingSpeed,
            ease: "linear",
            onUpdate: (latest) => {
                baseText.set(fullText.substring(0, Math.round(latest)));
            },
            onComplete: () => {
                setTimeout(() => {
                    setIsDeleting(true);
                }, delayBeforeDelete * 1000);
            }
        });

        return () => typingAnimation.stop();

    }, [textIndex, baseText]);
    
    useEffect(() => {
        if (!isDeleting) return;

        const fullText = texts[textIndex];

        const deletingAnimation = animate(fullText.length, 0, {
             type: "tween",
             duration: fullText.length * deleteSpeed,
             ease: "linear",
             onUpdate: (latest) => {
                baseText.set(fullText.substring(0, Math.round(latest)));
             },
             onComplete: () => {
                setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                setIsDeleting(false);
             }
        });

        return () => deletingAnimation.stop();

    }, [isDeleting, textIndex, baseText]);


  return (
    <section ref={targetRef} className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/IMG_1162_v1.JPEG"
          alt="A premier law firm"
          fill
          className="object-cover"
          priority
          data-ai-hint="office building modern"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 text-center max-w-4xl mx-auto" variants={stagger}>
          <motion.div variants={fadeUp}>
            <p className="text-lg md:text-xl text-white/80 mb-4">Oyewole & Adesina</p>
          </motion.div>
          <motion.div
            className="text-4xl md:text-7xl font-light font-headline leading-tight h-24 md:h-28"
            variants={fadeUp}
          >
             <motion.span>{displayText}</motion.span>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
