
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: { opacity: 0, y: 90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 2.0, 
      ease: "easeOut",
      staggerChildren: 0.8
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

export default function FirmIntroduction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full py-20 md:py-32 lg:py-40 bg-background"
      aria-labelledby="firm-introduction-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl" variants={itemVariants}>
            <Image
              src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/IMG_1163_v1.JPEG"
              alt="Oyewole & Adesina office discussion"
              fill
              className="object-cover"
              data-ai-hint="office meeting professional"
            />
          </motion.div>
          <motion.div className="space-y-4" variants={itemVariants}>
            <blockquote className="text-xl md:text-2xl font-light text-muted-foreground italic text-center">
              At Oyewole & Adesina, we combine deep legal expertise with a strategic, business-focused mindset to guide clients through every challenge. As a full-service firm headquartered in Lagos, we pride ourselves on delivering tailored, end-to-end solutions—backed by rigorous analysis, clear communication, and an unwavering commitment to integrity.
            </blockquote>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}


