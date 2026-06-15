
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Expertise as ExpertiseItem } from "@/db/schema";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import ExpertiseListItem from "./expertise-list-item";
import { useRef, useState } from "react";

export default function Expertise({ items }: { items: ExpertiseItem[] }) {
  const expertiseData = items;
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

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const defaultImage = "https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/IMG_1166_v1.JPEG";
  const defaultHint = "lawyer office business";

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
        <AnimatePresence>
          <motion.div
            key={hoveredImage || defaultImage}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full"
          >
            <img
              src={hoveredImage || defaultImage}
              alt="Professional legal services"
              className="object-cover w-full h-full absolute inset-0"
              data-ai-hint={hoveredImage ? expertiseData.find(e => e.image === hoveredImage)?.hint : defaultHint}
              style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/80"></div>
      </motion.div>

      <div ref={ref} className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 max-w-4xl"
          variants={headingVariants}
        >
          <div className="flex items-center gap-4">
            <span id="expertise-heading" className="text-3xl font-light tracking-tighter sm:text-5xl text-primary-foreground">Our Expertise</span>
            <div className="w-16 h-px bg-primary"></div>
          </div>
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mt-4">
            Distinct expertise, seamlessly covering the legal spectrum
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-8xl"
          variants={listVariants}
        >
          {expertiseData.slice(0, 10).map((item) => (
            <ExpertiseListItem
              key={item.slug}
              href={`/our-expertise/${item.slug}`}
              title={item.title}
              onMouseEnter={() => setHoveredImage(item.image)}
              onMouseLeave={() => setHoveredImage(null)}
            />
          ))}
        </motion.div>

        <div className="text-left mt-12 max-w-8xl">
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
