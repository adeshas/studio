
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.oyewoleadesina.com/wp-content/uploads/2019/06/legal_insights_1.jpg"
          alt="A premier law firm"
          fill
          className="object-cover"
          priority
          data-ai-hint="law books justice"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <motion.div 
        className="relative z-10 grid md:grid-cols-2 gap-8 items-center container mx-auto px-4 py-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 text-center md:text-left" variants={stagger}>
          <motion.h1 
            className="text-4xl md:text-7xl font-bold font-headline leading-tight"
            variants={fadeUp}
          >
            A Premier Law Firm
          </motion.h1>
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
