
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { expertiseData } from "@/lib/expertise-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ExpertiseListItem from "./expertise-list-item";

export default function Expertise() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="expertise"
      className="relative w-full py-20 md:py-32 lg:py-40 text-white"
      aria-labelledby="expertise-heading"
    >
        <div className="absolute inset-0 z-0">
            <Image
                src="https://picsum.photos/seed/lawyer/1920/1080"
                alt="Professional legal services"
                fill
                className="object-cover"
                data-ai-hint="lawyer office business"
            />
            <div className="absolute inset-0 bg-black/80"></div>
        </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div 
          className="mb-16 max-w-4xl"
          variants={headingVariants}
        >
          <div className="flex items-center gap-4 mb-4">
             <span className="text-sm uppercase tracking-widest text-primary-foreground/60">Our Expertise</span>
             <div className="w-16 h-px bg-primary"></div>
          </div>
          <h2 id="expertise-heading" className="text-4xl font-light tracking-tighter sm:text-6xl text-primary-foreground">
            Solutions across the spectrum of legal services
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
        
        <div className="text-left mt-16">
           <Link href="/our-expertise" className="inline-flex items-center text-lg text-primary-foreground hover:text-accent transition-colors duration-300 group">
                View All Practice Areas
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
           </Link>
        </div>
      </div>
    </motion.section>
  );
}
