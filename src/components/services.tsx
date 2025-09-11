
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { expertiseData } from "@/lib/expertise-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ExpertiseListItem from "./expertise-list-item";
import { useRef } from "react";

export default function Expertise() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);


  const headingVariants = {
    hidden: { opacity: 0, y: 90 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: "easeOut" } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 1.0,
      },
    },
  };

  return (
    <motion.section
      ref={targetRef}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="expertise"
      className="relative w-full py-20 md:py-32 lg:py-40 text-white overflow-hidden"
      aria-labelledby="expertise-heading"
    >
        <motion.div style={{ y }} className="absolute inset-0 z-0">
            <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/IMG_1163_v1.JPEG"
                alt="Professional legal services"
                fill
                className="object-cover"
                data-ai-hint="lawyer office business"
            />
            <div className="absolute inset-0 bg-black/80"></div>
        </motion.div>

      <div ref={ref} className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div 
          className="mb-12 max-w-4xl"
          variants={headingVariants}
        >
          <div className="flex items-center gap-4">
             <span id="expertise-heading" className="text-4xl font-light tracking-tighter sm:text-6xl text-primary-foreground">Our Expertise</span>
             <div className="w-16 h-px bg-primary"></div>
          </div>
           <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mt-4">
            Navigating complexity with clarity and precision
          </h2>
        </motion.div>
        
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl"
            variants={listVariants}
        >
            {expertiseData.slice(0, 8).map((item) => (
                <ExpertiseListItem key={item.slug} href={`/our-expertise/${item.slug}`} title={item.title} />
            ))}
        </motion.div>
        
        <div className="text-left mt-12 max-w-4xl">
           <Link href="/our-expertise" className="group relative inline-block overflow-hidden">
                <div className="highlight-swoop"></div>
                <div className="relative inline-flex items-center text-lg text-primary-foreground transition-colors duration-300 py-2 pr-8">
                    View All Practice Areas
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
           </Link>
        </div>
      </div>
    </motion.section>
  );
}
