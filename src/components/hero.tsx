
"use client";

import { motion, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
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
        className="relative z-10 grid md:grid-cols-2 gap-8 items-center container mx-auto px-4 py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 text-center md:text-left" variants={stagger}>
          <motion.div
            className="text-4xl md:text-7xl font-light font-headline leading-tight h-40 md:h-56"
            variants={fadeUp}
          >
             <motion.span>{displayText}</motion.span>
          </motion.div>
          <motion.p 
            className="text-lg md:text-xl text-white/80"
            variants={fadeUp}
          >
            Delivering expert legal solutions with integrity and a client-focused approach. Your trusted partner in navigating complex legal landscapes.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={fadeUp}
          >
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="/our-expertise">Explore Our Expertise</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative w-full h-80 md:h-[500px] group"
          variants={fadeUp}
        >
          <motion.div
             whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
             }}
             transition={{ type: "spring", stiffness: 300 }}
             className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
          >
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/08/CONFERENCE.jpg"
                alt="The modern and professional interior of the Oyewole & Adesina law office"
                fill
                className="object-cover"
                data-ai-hint="office conference"
             />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
